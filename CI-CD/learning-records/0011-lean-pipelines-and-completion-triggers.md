# Lean pipeline pattern and pipeline completion triggers taught — Apply vs Authorization comparison

Lesson 11 used Services.Authorization as a contrast to Applications.Apply. Key comparison: Authorization's 30-line pipeline vs Apply's 270-line pipeline — both achieve the same CI/CD outcome but through opposite philosophies. Taught the lean extends-first pattern (app team provides "what", shared V2 template provides "how"), the applicationBuildList object parameter passed to ${{ each }}, tradeoffs of explicit vs lean approaches (flexibility vs maintainability/security).

New technical concept: pipeline completion trigger via resources.pipelines — the GHAS scan fires when the main Authorization pipeline completes on release/* branches. Also taught: schedules: block, always: true (runs even without new commits), and the three-way trigger in the GHAS scan (tag trigger + pipeline completion trigger + schedule).

**Key practical insight taught:** The lean approach is right for standard services; explicit is right for apps with unusual build requirements (service containers, Playwright tests, Docker). Pipeline completion triggers decouple security scans from builds — the scan runs after, without slowing the main pipeline.

**Services.Authorization pipeline discovered:** azure-pipelines.yml (lean extends), azure-pipelines-scan.yml (AppScan nightly), azure-pipelines-ghas-scan.yml (GHAS with completion trigger + schedule). No local templates.

**Implications:** The user can now read any pipeline in the team's codebase — both lean and explicit styles — and understand the architectural decision behind each. A natural next step would be a comparison-based exercise where they analyse a third repo's pipeline and identify which pattern it uses and why.
