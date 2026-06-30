# User asked how SSO works across DIT components and external apps

The user wanted to understand SSO end-to-end: how the IDG session enables it for Apply and Illustrate,
and how to bring an application outside DIT into the same SSO bubble.

**Core mental model:** SSO is not a feature flag. It is a consequence of all OIDC clients pointing at
the same IDG. The IDG's `idsrv.session` browser cookie (domain: `identity.equisoft.com`) is the shared
anchor. Each app gets its own tokens — they never share tokens.

**The 7-step SSO flow:**
1. App A has no session → OIDC challenge → IDG login page → external IdP → IDG creates session cookie
2. App A receives code → exchanges for tokens → app A has its own auth cookie
3. User visits App B → OIDC challenge → IDG sees `idsrv.session` cookie → issues code with no login prompt
4. App B exchanges code → gets its own tokens with same user claims

**Why Apply and Illustrate already work:** They are registered OIDC clients of the same IDG.
The footgun is `prompt=login` in `OnRedirectToIdentityProvider` — this disables SSO for all users.

**To add an external app to the SSO bubble:**
1. Add client entry to `dit-base-config-common` (AllowedGrantTypes, RedirectUris, FrontChannelLogoutUri)
2. Critical: add `Properties.EcosystemTenant` or the `tenant` claim is absent from tokens
3. External app sets `Authority = https://identity.equisoft.com` and implements standard OIDC callback

**Single Sign-Out (SLO):**
- Must call `SignOutAsync` on BOTH the cookie scheme AND the OIDC scheme
- OIDC `SignOutAsync` redirects to `/connect/endsession` with `id_token_hint`
- IDG destroys the session cookie and fires front-channel logout iframes to all registered clients
- `FrontChannelLogoutUri` must be registered for each client — this is the most common missing piece
- Back-channel logout is more reliable (server-to-server JWT POST) but requires an HTTPS endpoint on the client

**`prompt=none`:** Silent SSO check. Returns code if session active, `login_required` error if not.
Used for background token refresh or session-restore in SPAs. DIT MVC apps mostly use refresh tokens instead.

**Debugging table:** Authority URL mismatch, `prompt=login` override, missing `EcosystemTenant`, and
missing `FrontChannelLogoutUri` cover 90% of SSO problems seen in practice.

**Implications for future lessons:**
- How does the IDG session lifetime interact with the access token lifetime and token refresh in Apply?
- Multi-tenant SSO: can a user have sessions for different tenants simultaneously? (Answer: yes — the IDG
  session is per-user per-IdP, not per-tenant, so theoretically possible but unusual in practice)
