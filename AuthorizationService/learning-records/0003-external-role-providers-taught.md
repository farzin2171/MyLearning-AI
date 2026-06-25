# External Role Providers covered

Taught the five provider types (Claims, Assistant, MicrosoftGraph, CustomApi, Oipa), priority/first-match-wins orchestration, the critical exception-stops-cascade behaviour, and the two-level mapping from provider role name → tblExternalRole → internal roles/permissions → access keys.

Key non-obvious insight surfaced: an exception in a higher-priority provider silently denies the user even if a lower-priority provider would have succeeded. This is the most operationally dangerous behaviour in the service.

**Implications:** User now has the full slow-path picture. Next session should cover the Policy → Role → Permission hierarchy — how to read it and predict access from a given policy assignment. That rounds out the data model understanding needed for confident debugging and design work.
