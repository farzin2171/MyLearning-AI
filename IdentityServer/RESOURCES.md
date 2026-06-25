# Identity & Authorization Resources

## Knowledge

- [Duende IdentityServer Documentation](https://docs.duendesoftware.com/identityserver/v7/)
  Authoritative reference for the exact version used (v7.3.2). Use for: client configuration, grant types, profile service, token generation, CORS, and key management.

- [RFC 6749 — The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
  The primary source for Authorization Code, Client Credentials, and Refresh Token flows. Use for: authoritative definitions of grant types, token endpoints, scopes.

- [RFC 7523 — JWT Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://www.rfc-editor.org/rfc/rfc7523)
  The spec behind the custom `urn:ietf:params:oauth:grant-type:jwt-bearer` grant used by the Identity Gateway for federated auth. Use for: understanding the JWT Bearer assertion flow.

- [OpenID Connect Core 1.0 Specification](https://openid.net/specs/openid-connect-core-1_0.html)
  Authoritative OIDC spec — ID tokens, UserInfo endpoint, scopes, claims. Use for: understanding what the Identity Gateway does beyond standard OAuth.

- [OAuth 2.0 Security Best Current Practice (BCP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
  IETF guidance on modern OAuth security. Use for: why PKCE matters, why implicit flow is deprecated, token leakage risks.

- [Curity: The Art of Token Validation](https://curity.io/resources/learn/token-validation/)
  Clear, practical guide to JWT validation in APIs. Use for: understanding what Services.Authorization and AssistantManagement do when validating incoming tokens.

- [Microsoft: Policy-based authorization in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies)
  Official ASP.NET Core authorization docs. Use for: understanding how `HasScopeRequirement` and `ServiceAccountAuthorizeFilter` patterns work in the real services.

## Internal Codebase References

- `C:\work\Applications.IdentityGateway\src\Equisoft.IdentityGateway\` — Identity Gateway source
- `C:\work\Services.Authorization\src\` — Authorization Service source  
- `C:\work\Services.AssistantManagement\src\` — AssistantManagement source

Key files:
- `IdentityGateway/Startup.cs` — IdentityServer configuration, auth providers, CORS
- `IdentityGateway/IdentityServer/Services/EquisoftProfileService.cs` — claims enrichment
- `IdentityGateway/IdentityServer/Services/EquisoftTokenResponseGenerator.cs` — tenantId/identityRole injection
- `Services.Authorization/V1/Controllers/AuthorizeController.cs` — the `/authorize` endpoint pattern
- `Services.Authorization/src/.../Data/Scripts/StoredProcedures/spGetUserAccessKeys.sql` — access key computation

## Wisdom (Communities)

- [Duende Software Community Forums](https://github.com/DuendeSoftware/IdentityServer/discussions)
  Official GitHub Discussions for Duende IdentityServer. Use for: edge cases, upgrade questions, behavior clarification.

- [Stack Overflow — tag: identityserver4 / duende-identityserver](https://stackoverflow.com/questions/tagged/identityserver4)
  Large Q&A base, mostly still applicable to Duende (v5+). Use for: common integration problems, claim mapping issues.
