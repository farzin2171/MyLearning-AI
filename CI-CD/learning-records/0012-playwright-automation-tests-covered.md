# Playwright automation tests in the Apply pipeline

Lesson 12 taught how the pipeline drives C# Playwright tests via environment variables and dotnet test runsettings. The key insight was the three-hop data flow: template parameter → environment variable → C# code reading it. BASE_URL and DEVICE_NAME are env vars read in Main.cs; Playwright.BrowserName and Playwright.ExpectTimeout are runsettings consumed internally by the PageTest base class.

**Key practical insight taught:** `--filter "Category=Deployment"` is the gate that separates deployment smoke tests (run in postRouteTraffic after every deploy) from the full regression suite (run nightly in the matrix). Only tests with `[Category("Deployment")]` run in the deployment pipeline — adding a test to that category is the explicit opt-in for smoke testing.

**Failure debugging path taught:** On failure, TearDown in Main.cs captures a screenshot + Playwright trace ZIP via TestContext.AddTestAttachment(). The trace is viewable at trace.playwright.dev and shows every action, DOM snapshot, and network request from the failed test. This is the primary debugging tool for flaky/failing CI test runs.

**maxParallel: 1 in the nightly matrix:** The 8 device/browser combos run sequentially to avoid concurrent writes to the same test data in the shared Dev environment. This is an important constraint to know when adding new device configurations.

**What was NOT taught:** BaseTest.cs API helpers (GetToken, CreateSimplifiedIssueForm, SendPutRequestWithXml) — these are test utilities for API-driven test setup and are a natural next step if the user wants to write new tests that require pre-creating data via the API.

**Other patterns not yet taught in this repo:**
- azure-pipelines-perf.yml (NeoLoad performance tests)
- azure-pipelines-scan.yml (AppScan security scanning + JIRA integration)
- Docker smart-tagging bash script in the Publish stage
- BaseTest.cs API testing helpers pattern

**Next gap:** The user can now trace any test failure end-to-end (pipeline → env vars → C# → trace artifacts). A logical next lesson would either be: (a) adding a new test to the Deployment category (hands-on practice), or (b) a new topic from the broader CI/CD curriculum like conditional jobs or pipeline variable scoping.
