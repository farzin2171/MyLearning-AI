---
name: pipeline-code-review-covered
description: Retrieval-practice lesson — five broken pipeline snippets covering all major misconfiguration patterns
metadata:
  type: project
---

# Pipeline code review — five bugs taught

Lesson 15 completed the final mission goal: "Review a teammate's pipeline YAML and catch
misconfigurations." Format was pure retrieval practice — five broken YAML snippets, each
with one real bug, self-rated before reveal.

**Five bugs covered (with source lessons):**

1. **fetchDepth missing** (Lesson 7) — `checkout: self` without `fetchDepth: 0` gives GitVersion
   a shallow clone; "Unable to determine the commit count" error, intermittent based on commit depth.

2. **Wrong artifact path in deployment job** (Lessons 5+13) — `$(Build.ArtifactStagingDirectory)`
   is the build agent's local path; deployment jobs run on a different agent and must use
   `$(Pipeline.Workspace)/drop/**/*.zip`.

3. **`job:` instead of `deployment:` bypasses approval gate** (Lesson 6) — `environment:` is
   only valid under `deployment:` jobs. Using a regular `job:` means the environment is never
   consulted and approval gates silently never fire.

4. **PR builds deploying** (Lessons 2+13) — DeployDev condition was just `succeeded()` with no
   `ne(variables['Build.Reason'], 'PullRequest')` guard. Every PR to develop overwrote Dev.

5. **Skipped parent kills dependsOn stage** (Lesson 13) — `succeeded()` returns false when
   the dependency was skipped (not failed). Fix: use
   `in(dependencies.DeployDev.result, 'Succeeded', 'Skipped')` or change the `dependsOn` target.

**Mental checklist distilled for future reviews:**
- fetchDepth: 0 if GitVersion is present
- Pipeline.Workspace in deployment jobs (not Build.ArtifactStagingDirectory)
- deployment: + environment: in all prod jobs (not job:)
- Build.Reason != PullRequest on deploy conditions
- in('Succeeded','Skipped') on conditions that depend on conditional stages

**Mission completion:** All five mission goals are now covered:
- Write a multi-stage YAML pipeline ✓ (Lesson 13)
- Configure triggers, environments, approvals ✓ (Lessons 2, 6, 13)
- Debug a failing pipeline run ✓ (Lesson 8)
- Review a teammate's pipeline YAML and catch misconfigs ✓ (this lesson)
- Deploy a Node.js/React app to Azure App Service ✓ (Lesson 13)
