# Mission: OAuth, OpenID Connect & Microservices Identity — From Foundations to Production

## Why
Build a complete, ground-up understanding of modern identity: OAuth 2.0 and OpenID Connect from first principles, through building a real Duende IdentityServer, to designing a fully secured microservices architecture. Then apply that foundation to the live Equisoft platform so new developers can contribute to production identity code within their first week.

## Success looks like

**Generic track (Modules 1–5)**
- Explain exactly what problem OAuth 2.0 solves and why password-sharing is dangerous
- Trace the Authorization Code + PKCE flow step by step from browser redirect to protected API call
- Build and run a Duende IdentityServer from scratch with clients, scopes, and interactive login
- Protect an ASP.NET Core API with JWT Bearer authentication and policy-based authorization
- Design a multi-service auth system with appropriate token flows for each service boundary

**Equisoft track (Module 6 + existing Lessons 1–11)**
- Explain the three Equisoft services (IdG, Authorization, AssistantManagement) and their roles
- Add JWT auth and policy-based authorization to a new Equisoft microservice
- Configure a new OAuth client in the Identity Gateway

## Curriculum Map

| Module | Lessons | Topics |
|--------|---------|--------|
| 1 — OAuth Foundations | 12–15 | Delegation problem, auth code flow + PKCE, grant types, JWT anatomy |
| 2 — OpenID Connect | 16–17 | ID tokens, claims, UserInfo endpoint, OIDC scopes |
| 3 — Duende IS Setup | 18–22 | Project setup, clients/resources, login UI, external IdPs, claims enrichment |
| 4 — Microservices Auth | 23–26 | JWT Bearer APIs, client credentials, policy-based authz, API gateway |
| 5 — Capstone | 27–29 | Full system build: IS + 2 APIs + gateway |
| 6 — Equisoft Applied | 30 + 1–11 | How Equisoft implements all of the above |

## Constraints
- Generic lessons must work standalone — no access to any Equisoft codebase required
- Equisoft lessons assume Modules 1–5 are complete (or equivalent prior knowledge)
- Capstone: .NET 8 + Duende IS 7.x + ASP.NET Core
- Each lesson: 20–30 minutes, completable solo

## Out of scope
- SAML 2.0 federation in depth
- Infrastructure / deployment / Kubernetes
- Azure AD B2C policy authoring
