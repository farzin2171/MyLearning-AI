---
name: github-workflow-anatomy-covered
description: GitHub Actions Track started — workflow anatomy, 3-level hierarchy, mapping from Azure Pipelines
metadata:
  type: project
---

# GitHub Actions Track — Lesson 1: Workflow Anatomy

User completed Lessons 1–18 in Azure Pipelines and now wants the same curriculum
using GitHub Actions + deploy to Azure. Track 2 starts with Lesson 19.

## Key concepts introduced

**3 levels, not 4:** Workflow → Job → Step. No `stages:` keyword.
Sequencing happens via `needs:` on jobs.

**File discovery:** Any `.yml` in `.github/workflows/` auto-activates — no Azure-style UI registration.

**Checkout is NOT automatic:** `uses: actions/checkout@v4` must always be the first step.
Azure does this implicitly; GitHub does not.

**Mapping committed:**
- `pipeline` → `workflow`
- `stage` → *(no keyword — use needs: to sequence)*
- `trigger:` / `pr:` → unified `on:` block
- `pool: vmImage:` → `runs-on:`
- `- task: Name@1` → `- uses: owner/repo@v1`
- `- script: / bash:` → `- run:`
- `$(VAR)` → `${{ vars.VAR }}` / `${{ secrets.SECRET }}`
- `dependsOn:` → `needs:`
- `condition:` → `if:`
- `PublishPipelineArtifact` → `actions/upload-artifact@v4`

**Context variables:** `github.ref_name`, `github.sha`, `github.run_number`, etc.
replace Azure's `Build.*` predefined variables.

**workflow_dispatch** = manual trigger (UI button) — like "Run pipeline" in Azure DevOps.
**workflow_call** = callable by another workflow — like an Azure template.

## What was NOT taught
- `permissions:` block (GITHUB_TOKEN scoping)
- `env:` at workflow vs job vs step scope (covered next lesson with variables)
- Self-hosted runners
- Composite Actions vs Reusable Workflows (upcoming template lesson)
