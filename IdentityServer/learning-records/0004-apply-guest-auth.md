# User asked about Apply MVC configuration and guest authentication

The user wanted to understand two things in the Apply codebase: (1) how the ASP.NET Core MVC app is
wired up for authentication, and (2) how `GuestController` and guest authentication work end-to-end.

**Key architectural insight:** Apply runs two completely separate authentication paths on the same cookie
scheme. Regular users get an OIDC-backed cookie (access + refresh tokens stored in DB). Guest users
get a local-only cookie with no tokens at all. The `isGuest = "true"` claim is the sentinel that makes
downstream code take the right branch — most visibly in `CookieAuthenticationFunctions.OnValidatePrincipal`,
which short-circuits immediately for guest users instead of running token refresh logic.

**The guest flow is deliberately self-contained:** `GuestAuthenticationHelper` creates a `User` row
locally (IsGuest=true, GUID ExternalId), assembles claims in memory, and calls `HttpContext.SignInAsync`
with cookie auth. The Identity Gateway is never contacted. A 90-day background cleanup job (`CleanupGuestRecordsHostedService`)
prevents unbounded growth from abandoned sessions.

**Implication for future lessons:**
- A follow-on lesson could cover how `FormOperationAuthorizationHandler` distinguishes guest ownership from
  regular-user ownership
- The `IframeAwareOpenIdConnectHandler` is an interesting pattern for embedded-form products; worth
  comparing against the standard OIDC challenge for regular users
- The gap between cookie expiry (30 days) and DB cleanup (90 days) means ghost DB records exist for up to
  60 days after a guest's cookie expires — relevant to data-retention questions
