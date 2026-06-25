---
name: matrix-strategy-covered
description: Matrix strategy — fan-out jobs across Node versions, OS, or browser configs
metadata:
  type: project
---

# Matrix strategy taught

Lesson 18 introduced matrix strategy as a fan-out mechanism: one job definition cloned into
multiple parallel runs, each with different variable values.

**Core syntax:**
```yaml
strategy:
  matrix:
    node_18:
      nodeVersion: '18.x'
    node_20:
      nodeVersion: '20.x'
  maxParallel: 3
```
Matrix keys become job-name suffixes (e.g. `TestMatrix node_18`). Matrix properties become
pipeline variables accessible as `$(nodeVersion)`.

**maxParallel:** sliding concurrency cap, not batch size. With 4 legs and maxParallel: 2,
Azure keeps 2 running at all times — as soon as one finishes the next starts.

**maxParallel: 1 pattern:** run matrix sequentially — used in Applications.Apply nightly
(Lesson 12) to prevent concurrent writes to shared test data in Dev environment.

**Multi-variable legs:** each leg can set multiple variables (e.g. both `vmImage` and
`nodeVersion`). Pool definition can reference a matrix variable: `vmImage: $(vmImage)`.

**Conditional steps per leg:**
```yaml
condition: eq(variables['nodeVersion'], '20.x')
```
Common pattern: run full tests on all legs, publish coverage artifacts only on the primary
LTS leg to avoid duplicate artifacts.

**Downstream dependsOn:** `dependsOn: StageName` (not the matrix job) waits for ALL legs
to complete. Any failing leg fails the stage, which blocks the dependent stage via
`condition: succeeded()`.

**Real example connection:** The Applications.Apply nightly 8-device matrix (Lesson 12) is
now fully readable — matrix sets `DEVICE_NAME`, `maxParallel: 1`, and injects `DEVICE_NAME`
as an env var to the dotnet test runner.

**What was NOT taught:**
- `System.JobPositionInPhase` and `System.TotalJobsInPhase` variables (available per leg)
- The `parallel: N` strategy (fixed fan-out by count, not by named properties)
- Matrix in deployment jobs (less common — usually matrix is for test jobs)
- Dynamic matrix from a previous step's output (advanced pattern)
