---
name: capstone-complete
description: Lesson 29 — WorkSpace Web built; end-to-end OIDC login + Calendar API call verified; Modules 1-5 complete
metadata:
  type: project
---

The learner has completed the full 5-module generic curriculum.

**WorkSpace Web (port 5002):**
- AddAuthentication().AddCookie().AddOpenIdConnect()
- DefaultScheme = Cookie, DefaultChallengeScheme = OpenIdConnect
- SaveTokens = true — access/id/refresh tokens stored in encrypted session cookie
- GetTokenAsync("access_token") in CalendarController to forward the user's token
- AccountController: Login (Challenge) and Logout (SignOut both Cookie + OIDC schemes)
- Double-scheme logout is critical — signing only the Cookie leaves the IS session active

**End-to-end smoke test verified:**
- Alice logs in → sees tenant-acme events only
- Bob logs in → sees tenant-globex events only
- Reports Worker → empty list (no tenant_id on machine token — correct by design)
- Logout → IS session also cleared; next login shows the login prompt again

**Key insight about back-channel code exchange:**
- Access token never touches the browser — server-to-server only
- Back-channel security is why Authorization Code flow is preferred over Implicit

**Modules 1–5 complete.** All 18 lessons (12–29) of the generic track are done.

**Module 6 — Equisoft Applied** is next:
- Revisit Lessons 1–11 (already in workspace) — they will read very differently now
- Apply the full knowledge stack to IdG, Services.Authorization, Services.AssistantManagement
