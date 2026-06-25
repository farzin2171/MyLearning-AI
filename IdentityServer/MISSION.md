# Mission: Identity & Authorization in the Equisoft Ecosystem

## Why
New developers joining the team need to quickly understand how Equisoft's three core identity services work together — the Identity Gateway, Authorization Service, and AssistantManagement — so they can write code that correctly integrates with them without guessing or breaking security contracts.

## Success looks like
- A developer can explain what each of the three services does and why they exist separately
- A developer can trace a full request lifecycle: from browser login through token issuance to a protected API call
- A developer can add JWT authentication and policy-based authorization to a new ASP.NET Core API service
- A developer can configure a new OAuth client (app) in the Identity Gateway
- A developer can explain the Equisoft custom claims (`tenantId`, `identityRole`, `tenant`) and where they come from
- A developer can explain the difference between the Authorization Code, Client Credentials, and JWT Bearer Assertion grant types — and know which to use in which scenario
- A developer understands the Authorization Service's role/policy/permission hierarchy and can query it correctly

## Constraints
- Audience already knows OpenID Connect and OAuth 2.0 conceptually
- Lessons should be grounded in the real codebase: Applications.IdentityGateway (Duende IS v7.3.2), Services.Authorization, Services.AssistantManagement
- Focus on onboarding speed: a developer should be productive within their first week

## Out of scope
- Deep Duende IdentityServer administration (license, migrations, ops)
- SAML 2.0 federation in depth (edge case)
- Azure AD B2C policy authoring
- Infrastructure / deployment / Kubernetes
