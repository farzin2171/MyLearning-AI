---
name: private-package-feeds-covered
description: Private npm and NuGet feed authentication in Azure Pipelines — service connections, .npmrc, NuGet.Config
metadata:
  type: project
---

# Private package feeds taught

Lesson 17 covered authenticating to private Azure Artifacts feeds from a pipeline — directly
grounded in the team's patterns (Equisoft.npm service connection, Services.Authorization NuGet.Config).

**Core distinction taught:** Same-org feeds authenticate automatically (Azure injects token).
Project-scoped feeds in a different project, or feeds in a different org, require an explicit
service connection.

**Node.js pattern (team's approach):**
```yaml
- task: Npm@1
  inputs:
    command: 'ci'
    customRegistry: useNpmrc         # reads registry URL from .npmrc
    customEndpoint: 'Equisoft.npm'   # service connection injects auth at run time
```
`.npmrc` committed to repo contains only the registry URL + `always-auth=true`.
Credentials are NEVER committed — injected by the task at run time.

**.NET pattern (Services.Authorization approach):**
```yaml
- task: DotNetCoreCLI@2
  inputs:
    command: 'restore'
    feedsToUse: 'config'
    nugetConfigPath: 'NuGet.Config'
    externalFeedCredentials: 'Equisoft.nuget'
```
`NuGet.Config` committed to repo (no credentials). Service connection maps to the feed URL.
Alternative for same-org inline feeds: `feedsToUse: 'select'` + `vstsFeed: '<project-GUID>/<feed>'`.

**Service connection creation:**
- Type: npm or NuGet
- Registry URL: exact `pkgs.dev.azure.com/…/_packaging/…/registry/` URL
- Auth: Username/Password with a PAT (Packaging Read scope)
- Must be granted access to the pipeline (Library → Service connections → Security)

**Common errors documented:**
- 401: expired PAT or pipeline not granted access to service connection
- 404: wrong feed URL
- npm E401 with no .npmrc: missing .npmrc file or wrong registry URL
- Service connection not found: name mismatch (case-sensitive)

**Caching interaction:** Cache and auth are independent. A 401 on a cache-enabled pipeline
is a service connection problem, not a cache problem. Debug by temporarily disabling cache
(`condition: always()` on Cache@2).

**What was NOT taught:**
- Upstream sources (public feed proxying through Azure Artifacts)
- Feed views (local/prerelease/release promotion)
- Publishing packages TO a feed from the pipeline
- Cross-organization feed access with workload identity federation
