---
name: pipeline-caching-covered
description: Cache@2 task for npm and NuGet — key design, restoreKeys fallback, CACHE_RESTORED variable
metadata:
  type: project
---

# Pipeline caching taught

Lesson 16 introduced the Cache@2 task as the primary build speed optimization after the user
completed the full mission in Lessons 13-15. This extends the Lesson 13 capstone pipeline.

**Core mechanic:** Cache@2 computes a hash from the files named in the `key` expression.
On a cache hit the `path` directory is restored before the install step runs — packages are
already present and the install completes in seconds instead of minutes.

**Cache key design rule:** Include the lock file content in the key (package-lock.json or
packages.lock.json). The key only changes when dependencies actually change — no false
invalidations, no stale caches.

**Node.js implementation:**
```yaml
variables:
  npm_config_cache: $(Pipeline.Workspace)/.npm
steps:
  - task: Cache@2
    inputs:
      key: 'npm | "$(Agent.OS)" | package-lock.json'
      restoreKeys: |
        npm | "$(Agent.OS)"
      path: $(npm_config_cache)
  - task: Npm@1
    inputs:
      command: 'ci'
```

**.NET/NuGet implementation:**
```yaml
variables:
  NUGET_PACKAGES: $(Pipeline.Workspace)/.nuget/packages
steps:
  - task: Cache@2
    inputs:
      key: 'nuget | "$(Agent.OS)" | **/packages.lock.json,!**/bin/**,!**/obj/**'
      restoreKeys: |
        nuget | "$(Agent.OS)"
      path: $(NUGET_PACKAGES)
```

**NuGet lock file opt-in:** `<RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>` in
.csproj is required. Without it, packages.lock.json is never generated and the cache key
glob finds nothing. Fallback: use `**/*.csproj` as the key file.

**restoreKeys:** Prefix-based fallback. If exact key misses, Azure uses the broader prefix
as a partial match — faster than a full download.

**CACHE_RESTORED:** Boolean variable set by Cache@2. Can be used to skip the install step
entirely with `condition: ne(variables.CACHE_RESTORED, 'true')`.

**Placement rule:** Cache@2 must be placed BEFORE the install/restore step.

**What was NOT taught:**
- Caching test results or build outputs (less common pattern)
- Per-project cache isolation (multiple projects in one pipeline)
- Cache storage limits (10 GB per pipeline, 7-day TTL)
- Cache task in a matrix strategy (each matrix leg gets its own cache)
