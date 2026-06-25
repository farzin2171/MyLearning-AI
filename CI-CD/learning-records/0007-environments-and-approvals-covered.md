# Environments and approvals taught — checks, branch control, Octopus channel mapping

Lesson 6 covered what an Azure Pipelines environment is (tracking + gating concept, not compute), the deployment: job + environment: key in YAML, the four check types (required reviewers, branch control, exclusive lock, business hours), that checks are configured in the UI (not YAML), and how this maps to the team's branch → Octopus channel convention.

**Key practical insight taught:** Branch control is a second security layer on top of YAML stage conditions — even if someone edits the condition, the check on the environment itself blocks non-allowed branches. Checks pause the pipeline before the deployment job's steps execute, not before the stage.

**Implications:** The user can now design a full gated pipeline with proper approvals. The next productive gap is **GitVersion and semantic versioning** — the team uses it for $(GitVersion.SemVer) and $(GitVersion.AssemblySemVer) throughout their templates, and understanding how it works (gitversion/setup + gitversion/execute, the versioning strategy, branch-based pre-release labels) would let the user reason about version numbers in their pipelines.
