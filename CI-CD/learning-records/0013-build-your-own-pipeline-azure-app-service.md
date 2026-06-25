---
name: build-your-own-pipeline-azure-app-service
description: Capstone — complete step-by-step guide to build a CI/CD pipeline deploying to Azure App Service without Octopus
metadata:
  type: project
---

# Capstone lesson: building a full CI/CD pipeline to Azure App Service

Lesson 13 was a practical capstone triggered by the user wanting to create their own repository
and pipeline from scratch — using Services.Authorization as the model but replacing Octopus Deploy
with native Azure App Service deployment.

**Key decision contrasted:** Team uses Octopus (NuGet artifact → Octopus release → Octopus deploys).
The user's own pipeline uses `AzureWebApp@1` (zip artifact → direct Azure App Service deploy).
No external tool required.

**Pipeline structure taught:**
- 3-stage pipeline: Build → DeployDev → DeployProd
- DeployDev: fires on develop, release/*, hotfix/*, tags (not PRs)
- DeployProd: fires only on main or tags, gated by Azure DevOps Environment approval

**Critical YAML details the user worked through:**
- `fetchDepth: 0` required for GitVersion (full history)
- `zipAfterPublish: true` required for AzureWebApp@1 to find the package
- `checkout: none` in deployment jobs (artifacts downloaded automatically)
- `appSettings` block overrides App Service environment variables at deploy time
- `ne(variables.isPR, true)` gates deployment stages away from PR builds

**Azure DevOps setup steps:**
1. Azure App Service created in portal (Dev + Prod instances)
2. Service Connection (Azure Resource Manager / Workload Identity Federation)
3. Variable group `my-service-vars` (azureServiceConnection, appServiceNameDev, appServiceNameProd)
4. `dev` environment (no approval), `prod` environment (approval gate)

**Node.js adaptation shown:** Same Deploy stages; Build stage swaps DotNetCoreCLI for
NodeTool → Npm ci → Npm build → ArchiveFiles@2 → PublishPipelineArtifact@1

**Common pitfalls documented:**
- "No package found" → zipAfterPublish missing
- GitVersion commit count error → fetchDepth: 1 (shallow)
- DeployProd never runs → DeployDev was skipped (skipped parent breaks dependsOn)
- Service connection not found → variable group not linked to pipeline

**Why:** [[user-background]] — user wants to own CI/CD infrastructure independently, not just use
team templates. This lesson gives them a complete, self-contained starting point.
