---
name: claims-enrichment
description: Lesson 22 — IProfileService, claims pipeline, ID vs access token claims
metadata:
  type: project
---

The learner has completed Module 3 with the claims enrichment lesson.

**Established knowledge:**
- `IProfileService` is the extension point Duende IS calls on every token issuance
- `GetProfileDataAsync` — add claims to `context.IssuedClaims`; filter strictly by `context.RequestedClaimTypes`
- `IsActiveAsync` — return `context.IsActive = false` to block locked/deleted accounts from receiving new tokens
- Claims must be declared in scope config AND emitted in IProfileService — both sides must cooperate
- ID token: identity claims via `IdentityResource.userClaims` (consumed by client, not API)
- Access token: authorization claims via `ApiScope.userClaims` (consumed by the API)
- Never put authorization claims in the ID token
- `context.Client.ClientId` allows per-client claim sets
- Registration: `.AddProfileService<MyProfileService>()` inside `AddIdentityServer()`

**Module 3 complete.** All five lessons (18–22) finished:
- 18: Project setup & architecture
- 19: Clients & resources (Config.cs)
- 20: Login UI (Razor Pages)
- 21: External providers (Google/Azure AD)
- 22: Claims enrichment (IProfileService)

**Next: Module 4 — Microservices Auth (Lessons 23–26)**
- Lesson 23: JWT Bearer API — protecting an ASP.NET Core API
- Lesson 24: Client Credentials — service-to-service token acquisition
- Lesson 25: Policy-based authorization
- Lesson 26: API Gateway pattern
