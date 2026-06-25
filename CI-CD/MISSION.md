# Mission: CI/CD with Azure Pipelines AND GitHub Actions → Deploy to Azure

## Why
Build and maintain professional-grade CI/CD pipelines at work. Track 1 (Lessons 1–18) covered Azure Pipelines deeply. Track 2 (Lessons 19+) covers the same concepts using **GitHub Actions** as the CI/CD engine, still deploying to Azure. The goal is to own both toolchains — so the user can work confidently regardless of which platform a project uses.

## Success looks like
- Write a GitHub Actions workflow from scratch for a JS/TS project (build → test → deploy to Azure)
- Map every Azure Pipelines concept (triggers, variables, templates, environments) to its GitHub Actions equivalent
- Deploy a Node.js or React app to Azure App Service via a GitHub Actions workflow
- Use OIDC / Workload Identity Federation for keyless Azure auth from GitHub Actions
- Debug a failing workflow run — know where to look and what the error means

## Constraints
- Learning happens in sessions, not a bootcamp — lessons should be completable in 15–30 min
- The user has completed Lessons 1–18 (Azure Pipelines) — GitHub Actions lessons assume that knowledge and draw explicit parallels
- Projects are JavaScript/TypeScript — examples should reflect that stack

## Track 1 complete (Azure Pipelines, Lessons 1–18)
YAML anatomy · Triggers · Variables · Templates · Artifacts · Environments · GitVersion · Debugging · Service containers · Lifecycle hooks · Completion triggers · Playwright in pipeline · App Service deploy · Deployment slots · Pipeline code review · Caching · Private feeds · Matrix strategy

## Out of scope
- Azure Kubernetes Service (AKS) deep-dives
- Infrastructure-as-Code (Bicep / Terraform) — separate concern
- Classic (GUI-based) pipelines — YAML only
