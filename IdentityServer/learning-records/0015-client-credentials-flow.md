---
name: client-credentials-flow
description: Lesson 24 — service-to-service token acquisition, caching, and Duende.AccessTokenManagement
metadata:
  type: project
---

The learner has covered the client-side of service-to-service token management.

**Established knowledge:**
- Raw Client Credentials token request: POST to /connect/token with grant_type, client_id, client_secret, scope
- Response: access_token + expires_in (seconds)
- Two approaches:
  - Manual (IdentityModel): `RequestClientCredentialsTokenAsync` — low-level, developer manages caching
  - Automatic (Duende.AccessTokenManagement): `AddClientCredentialsTokenManagement` + `AddClientCredentialsHttpClient` — caching/renewal built in
- Caching strategy: cache until `expires_in - 60s` to account for clock skew between services
- `AddClientCredentialsHttpClient` wires a DelegatingHandler — token management is fully transparent to calling code
- Common mistake: re-requesting a token on every HTTP call (wastes token endpoint capacity)

**Implications for Lesson 25 (Policy-Based Authorization):**
- Learner can now acquire tokens with specific scopes
- Ready to see how APIs enforce fine-grained policies on those scopes (role-based, claims-based, resource-based)
