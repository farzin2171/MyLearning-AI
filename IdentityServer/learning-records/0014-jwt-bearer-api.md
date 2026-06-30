---
name: jwt-bearer-api
description: Lesson 23 — JWT Bearer middleware in ASP.NET Core, token validation, [Authorize]
metadata:
  type: project
---

The learner has covered the resource-server side of the token flow — protecting an ASP.NET Core API with JWT Bearer authentication.

**Established knowledge:**
- `AddAuthentication().AddJwtBearer()` wires the validation middleware
- Two required options: `Authority` (Duende IS URL) and `ValidAudience` (aud claim)
- Middleware auto-fetches JWKS from discovery doc on first use, then caches it — no per-request network call
- Five automatic validation checks: signature, exp, iss, aud, nbf
- `app.UseAuthentication()` must come before `app.UseAuthorization()` — order matters
- `[Authorize]` on controller/action; `[AllowAnonymous]` to opt out
- `User.FindFirstValue("claim-name")` reads claims populated from the token
- Scope policies: `RequireClaim("scope", "calendar.read")`
- 401 = no valid token (authentication failure); 403 = valid token, missing permission (authorization failure)
- Debugging: enable `Microsoft.AspNetCore.Authentication` at Debug log level

**Implications for Lesson 24 (Client Credentials Flow):**
- Learner knows what the API expects (Authorization: Bearer header, aud claim, scope claim)
- Ready to see the client side: how a background service acquires and caches a token to call this API
