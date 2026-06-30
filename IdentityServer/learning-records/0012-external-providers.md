---
name: external-providers
description: Lesson 21 — federating Google/Azure AD via external provider handlers in Duende IS
metadata:
  type: project
---

The learner has covered the external provider federation pattern in Duende IS.

**Established knowledge:**
- From the external provider's view, Duende IS is an OAuth client registered in their console
- External providers registered via `AddAuthentication().AddGoogle()` / `AddOpenIdConnect()`
- `SignInScheme = ExternalCookieAuthenticationScheme` stores the external identity in a temporary cookie until the callback processes it — most common setup mistake when omitted
- Challenge pattern: login page calls `Challenge(props, provider)` to redirect the browser to Google/Azure AD
- Callback page: `AuthenticateAsync(ExternalCookieAuthenticationScheme)` reads the external claims, maps them to a local user, calls `SignInAsync(isuser)`, then **deletes** the external cookie
- Auto-provisioning: create a local user record linked to `(provider, providerUserId)` on first login
- Claims mapping: never use the external user ID as `sub`; always generate a stable local ID
- `IdentityProvider` property on `IdentityServerUser` records which provider was used (e.g. "Google")

**Implications for Lesson 22 (Claims Enrichment):**
- Learner understands the `AdditionalClaims` field on `IdentityServerUser` — ready to see how claims flow into tokens via `IProfileService` / `IClaimsService`
- Knows both local and external login produce an `IdentityServerUser` — claims enrichment applies to both paths uniformly
