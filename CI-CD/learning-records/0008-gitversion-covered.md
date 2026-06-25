# GitVersion and semantic versioning taught — branch→version mapping, two tasks, fetchDepth gotcha

Lesson 7 covered what GitVersion is (reads git history + tags to calculate SemVer), the two tasks (gitversion/setup then gitversion/execute), why fetchDepth: 0 is required on build jobs, the branch→SemVer mapping (feature/beta/rc/stable), the five key variables (SemVer, MajorMinorPatch, AssemblySemVer, NuGetVersionV2, InformationalVersion), and how GitVersion.yml configures the strategy. Also created the first reference document: reference/gitversion-cheatsheet.html.

**Key practical insight taught:** fetchDepth: 0 on build jobs and fetchDepth: 1 on PR jobs is the correct split — PR jobs don't run GitVersion. MajorMinorPatch strips the pre-release label and is the right variable when you need a clean version number regardless of branch.

**Implications:** The user can now read any pipeline that uses GitVersion and understand what version string will be produced for any branch. The next productive gap is **debugging failing pipelines** — how to read pipeline logs, understand common error patterns (task not found, variable not set, permission errors), and use the Azure DevOps UI diagnostics. This directly serves the mission goal "debug a failing pipeline run — know where to look and what the error means."
