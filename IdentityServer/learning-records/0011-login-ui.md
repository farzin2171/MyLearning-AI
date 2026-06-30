---
name: login-ui
description: Lesson 20 — Login UI, Razor Pages, and auth code issuance in Duende IS
metadata:
  type: project
---

The learner has covered the Login UI layer of Duende IS — the Razor Pages that handle user authentication and hand control back to the identity server.

**Established knowledge:**
- Duende IS ships no built-in login UI — the developer must provide Razor Pages (or scaffold the QuickStart UI)
- The full login sequence: browser → /connect/authorize → Login page → SignInAsync → returnUrl → auth code issued → token exchange
- `IIdentityServerInteractionService.GetAuthorizationContextAsync(returnUrl)` decodes the OIDC request context
- `IdentityServerUser(subjectId)` wraps a user into the IS session; `SubjectId` becomes the `sub` claim
- `HttpContext.SignInAsync(isuser)` issues the auth cookie; redirect to `returnUrl` triggers auth code issuance
- Three required pages: Login, Logout, Consent
- `RequireConsent = false` skips consent for trusted internal clients
- QuickStart UI scaffold via `duende new ui` CLI command
- Developer's responsibility: the user store (validate credentials) — IS does not manage users

**Implications for Lesson 21 (External Providers):**
- Learner understands that credentials validation is pluggable — ready to replace `_users.ValidateAsync()` with a redirect to an external IdP
- Knows what `IdentityServerUser` is, so external IdP flow (receive callback → build IdentityServerUser → SignInAsync) will map cleanly
