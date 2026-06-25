# Team uses PipelineTemplates repo with extends: pattern, Octopus Deploy for CD

The user's team maintains a shared `PipelineTemplates` git repo that all app pipelines reference via `resources.repositories`. Pipelines use `extends:` to inherit a full pipeline template with parameters. CD is via **Octopus Deploy** (not Azure App Service), with channels mapped to Git branches. The Node/React stack uses NodeTool@0, Npm@1 with a private Equisoft.npm registry, and Node 24.x.

**Evidence:** User pointed to C:\work\PipelineTemplates; files read directly.

**Implications:**
- All future lessons should use real code from these templates as primary examples
- The `extends:` + `resources.repositories` pattern is the most important template concept to teach — it's how the team actually works
- Variables lessons must cover variable groups (Pipeline_Main, pipeline-templates) since those are how shared secrets and agent pool names are injected
- `##vso[task.setvariable]` output variable logging commands are used heavily (GHAS pipeline)
- Octopus Deploy is the CD tool — lesson on deployment should reference it
- "JS/TS stack" in this team means React apps scanned via GHAS, not full build/deploy pipelines yet
