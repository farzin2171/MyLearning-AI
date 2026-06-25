# Triggers and conditions taught — including the Azure Repos pr: gotcha

Lesson 2 covered all three trigger types (trigger:, pr:, schedules:), branch/path filters, and condition expressions (succeeded, failed, succeededOrFailed, always).

**Key non-obvious point recorded:** In Azure Repos Git repos, the YAML `pr:` keyword is silently ignored — PR build validation must be set via branch policies in the UI. This is a critical practical distinction that trips up most people moving from GitHub.

**Implications:** Future lessons can reference conditions freely. The next gap in the mission is variables and secrets — the user cannot write a meaningful multi-stage deploy pipeline without knowing how to pass configuration and credentials safely.
