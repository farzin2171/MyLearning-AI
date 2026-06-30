---
name: clients-resources-config
description: Lesson 19 — mapping OAuth concepts to Config.cs in Duende IS
metadata:
  type: project
---

The learner has covered the core Config.cs configuration objects in Duende IdentityServer.

**Established knowledge:**
- `IdentityResource` — maps an OIDC scope to user claims in the ID token (`openid`, `profile`, `email`, custom)
- `ApiScope` — names a permission an API enforces (e.g. `calendar.read`)
- `ApiResource` — optional logical grouping of scopes under a shared audience
- `Client` — registered application entry with `ClientId`, `ClientSecrets`, `AllowedGrantTypes`, `AllowedScopes`, `RedirectUris`
- Client Credentials pattern (no user, machine-to-machine)
- Authorization Code + PKCE pattern (user-facing, web/SPA/mobile)
- How Config collections wire into `AddIdentityServer()` in `Program.cs`
- `AddDeveloperSigningCredential()` is dev-only; production requires `AddSigningCredential(cert)`

**Implications for Lesson 20 (Login UI):**
- Learner understands what a "client registration" and "redirect URI" mean in code
- Ready to see the Razor Pages/QuickStart UI that handles the actual user login and auth code issuance
