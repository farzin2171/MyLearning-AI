# Notes

- User has **some prior Azure DevOps experience** — skip 100% intro content, start slightly above beginner
- Primary stack: **JavaScript / TypeScript** — all pipeline examples should use npm/Node.js contexts
- Learning is **professional / job-driven**, not certification — prioritise practical, team-workflow scenarios
- Lessons should be **completable in 15–30 min**

## Team pipeline templates — C:\work\PipelineTemplates

Always use real patterns from the team's templates as lesson examples. Key discoveries:

**Repo structure:**
- `CI/` — step and job templates for building .NET services, libraries, containers
- `CD/octopus/` — Octopus Deploy release creation and deployment templates
- `V2/` — newer versions of the main templates (prefer V2 patterns)
- `PR/` — PR validation (commitlint)
- `scans/ghas/` — GitHub Advanced Security / CodeQL scans, including a **React/Node.js** pipeline

**How app repos consume templates:**
```yaml
resources:
  repositories:
  - repository: templates
    name: PipelineTemplates
    type: git
extends:
  template: /CI/build-dotnet-service-pipeline.yml@templates
  parameters:
    buildDocumentation: true
```

**Key patterns in the templates:**
- `variables: - group: Pipeline_Main` — variable groups for shared secrets/config
- `variables: - group: pipeline-templates` — second group for template-specific vars
- `isMaster/isDevelop/isRelease/isHotfix/isTag` runtime expressions at stage scope
- Stage conditions: only publish on master/develop/release/hotfix/tag branches
- `${{ if eq(parameters.buildDocumentation, true) }}` — compile-time parameter conditionals
- `${{ each item in parameters.list }}` — iteration over object parameters
- `##vso[task.setvariable variable=X;isOutput=true]` — output variables from scripts
- `dependencies.JobName.outputs['step.variable']` — reading output vars in downstream jobs
- `checkout: none` on publish/deploy jobs — no source needed, just artifacts
- `workspace: clean: all` on build jobs
- `NodeTool@0` + `Npm@1` for Node.js (default Node 24.x)
- `customEndpoint: 'Equisoft.npm'` + `customRegistry: useNpmrc` — private npm registry
- **GitVersion** (`gitversion/setup@3.2.1`, `gitversion/execute@3.2.1`) for semantic versioning
- `$(GitVersion.SemVer)`, `$(GitVersion.AssemblySemVer)` variables set by GitVersion
- **Octopus Deploy** for CD (not Azure App Service) — channels mapped to branches
  - develop → Development channel
  - release/hotfix → Testing channel
  - master/tags → Release channel
- Slack notifications via PowerShell `Invoke-WebRequest` to webhook
- GHAS: CodeQL, dependency scanning for security

**Node/React pipeline** (scans/ghas/ghas-scan-reactjs-pipeline.yml):
- `NodeTool@0` → `Npm@1 ci` → CodeQL init → `Npm@1 build` → dependency scan → CodeQL analyze
- Jobs: Build → CreateJiraTickets → SendSlackNotification → CheckCriticalAndHighAlerts
- `dependsOn` + output variables pattern between jobs

**Team conventions:**
- Branches: master, develop, release/*, hotfix/*, feature/*
- Conventional commits enforced on PRs (commitlint)
- PR scope must match: deps, DIT-*, DITINFRA-*
- Shallow checkout (`fetchDepth: 1`) on PR validation jobs
- Agent pools from variable group: `$(CILinuxAgentPool)`, `$(CIWindowsAgentPool)`

## Applications.Apply pipeline — C:\work\Applications.Apply

Real application pipeline. Key patterns not seen in generic templates:

**Service containers in build-app.yml:**
```yaml
resources:
  containers:
    - container: net10
      image: "mcr.microsoft.com/dotnet/sdk:10.0"
    - container: db
      image: "mcr.microsoft.com/mssql/server:2022-latest"
      hostname: db
      ports: ['1433:1433']
      env:
        MSSQL_SA_PASSWORD: '$(sa_password)'
        ACCEPT_EULA: "Y"
    - container: redis
      hostname: redis
      image: redis
      ports: ['6379:6379']
```
Job uses `container: net10` (runs inside the SDK image) + `services: db: db / redis: redis` (sidecars). Integration tests connect via hostname `db` and `redis`.

**Deployment lifecycle hooks in azure-pipelines.yml:**
```yaml
strategy:
  runOnce:
    deploy:
      steps: [checkout: none, Octopus deploy]
    postRouteTraffic:
      steps: [checkout: self, Playwright automated tests]
    on:
      failure:
        steps: [checkout: none, Slack notification]
```
`postRouteTraffic` runs after deploy succeeds — used for smoke tests. `on.failure` only runs when the job fails — used for Slack alerts. `checkout: self` needed in postRouteTraffic because automated-tests.yml needs the test project source.

**Multi-pipeline split:**
- `azure-pipelines.yml` — main CI/CD (Build → Publish → Dev → QA)
- `azure-pipelines-tests.yml` — nightly cross-browser matrix (8 device/browser combos)
- `azure-pipelines-scan.yml` — AppScan + JIRA + Slack for security on release branches
- `azure-pipelines-perf.yml` — NeoLoad performance tests (manual trigger)

**Docker smart tagging (bash script in Publish stage):**
- develop → `latest-dev`
- release/*, hotfix/* → `latest-rc`
- master, tags → `latest`

**Build.BuildNumber** used for Octopus `--packageVersion=` (not GitVersion.SemVer directly — uses the pipeline run number which is configured to use GitVersion).
