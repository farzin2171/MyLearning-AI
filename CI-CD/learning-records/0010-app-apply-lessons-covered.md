# Applications.Apply pipeline explored — two new lessons created

Explored C:\work\Applications.Apply in full. Pipeline has 4 YAML files (azure-pipelines.yml main, azure-pipelines-tests.yml nightly matrix, azure-pipelines-scan.yml security, azure-pipelines-perf.yml NeoLoad) plus 6 local templates.

Lesson 9 (service containers): resources.containers block (net10/db/redis), job-level container: vs services:, alias-as-hostname pattern (db → Server=db,1433), secret env vars via $(sa_password), ASPNETCORE_ENVIRONMENT=Integration connecting build to the sidecar.

Lesson 10 (lifecycle hooks): the three runOnce hooks (deploy/postRouteTraffic/on.failure), when each fires, why postRouteTraffic uses checkout: self (needs AutomationTests source) while the others use checkout: none, the on.failure → Slack pattern, and a bonus section on the nightly matrix strategy reusing the same automated-tests.yml template.

**Key practical insight taught:** postRouteTraffic is the right place for smoke tests — they run after the deployment succeeds, against the real live URL, and if they fail the on.failure hook alerts the team. The checkout: self vs checkout: none split in different hooks is a common source of confusion.

**Other patterns observed in this app (not yet taught):**
- Multi-pipeline architecture (4 separate pipelines for different purposes)
- Docker smart tagging via bash script (##vso[task.setvariable] setting latest-dev/latest-rc/latest)
- AppScan security scanning + JIRA integration in the scan pipeline
- NeoLoad performance testing (azure-pipelines-perf.yml)
- Job matrix strategy (nightly tests, 8 device/browser combos)
