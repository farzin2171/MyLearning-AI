# Debugging failing pipelines taught — three-click rule, log format, five common errors

Lesson 8 covered the three-click debugging approach (overview → job → step), the ##[prefix] log format (section/command/warning/error/debug), the five most common errors (exit code N, task not found, template not found, resource not authorized, empty variable), System.Debug diagnostic logging, and the "Skipped" stage problem (condition false — diagnose with echo steps).

**Key practical insight taught:** "Bash exited with code 1" is always the wrapper — the actual error is in the lines above it. Read error logs bottom-up to find the first ##[error] line, not the last. System.Debug should only be set temporarily (it exposes variable values in plain text).

**Implications:** The user can now debug the most common real-world pipeline failures confidently. All five success criteria from the mission are now addressed across the 8 lessons. The next productive direction is a **capstone exercise** — writing a complete multi-stage pipeline for a Node/TS project from scratch, integrating everything covered: triggers, variables, templates, artifacts, GitVersion, environments, and knowing how to debug it. This would consolidate learning and build the storage strength that fluency alone can't provide.
