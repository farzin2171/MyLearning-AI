# User asked how Services.User fits into the authentication context

The user wanted to connect Services.User (at `C:\work\Services.User`) to what they already learned about Apply's authentication setup.

**Key architectural insight — three-service split:**
- IDG answers "who are you?" (authentication, token issuance)
- Apply's local User table answers "do you exist here?" (local record, ExternalId linkage, IsGuest flag)
- Services.User answers "what is your role / what are your attributes?" (connector-based routing to Azure Graph, WebAPIs, etc.)

**Services.User has no User table.** Its DB stores Connectors, Handlers, and configuration rows that describe *how* to find user attributes — not the attributes themselves. This surprises most developers who expect it to be a user registry.

**Two separate flows use these three services:**
1. Sign-in flow: IDG → Apply OIDC handler → OnSignedIn cookie event → Apply DB User upsert
2. Role-check flow: Apply code → UserServiceClient (service-account Bearer token) → Services.User → connector → Azure Graph / WebAPI

**The "two UserService" naming trap:** `Equisoft.Apply.Services.Users.UserService` is Apply's local service for its own User table. `UserService.Services.V2.Services.UserService` is the internal logic class inside the Services.User microservice. Same class name, completely different responsibilities — always check the namespace.

**Service account token pattern:** When Apply calls Services.User, it uses a service-account token from the IDG token endpoint — not the end-user's own access token. Services.User validates this against the IDG (audience: "userapi"). The ServiceAccountAuthorizeFilter additionally blocks non-Service identity types from management endpoints.

**Implications for future lessons:**
- How connector selection works per-tenant (cascading fallback) is worth a dedicated topic for developers who need to configure Services.User for a new tenant
- The ID conversion endpoint (`/useridentity/convert`) is an unexplained dependency worth investigating: Local vs External ID semantics
