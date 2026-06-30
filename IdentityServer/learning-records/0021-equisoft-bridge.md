---
name: equisoft-bridge
description: Lesson 30 — Module 6 bridge established; WorkSpace system mapped to Equisoft platform
metadata:
  type: project
---

The learner completed all 5 generic modules and crossed into Module 6 (Equisoft Applied).

**System-level mapping confirmed:**
- WorkSpace IS = Applications.IdentityGateway (IdG) — same Duende IS, same Config.cs patterns
- Calendar API = Services.AssistantManagement — same JWT Bearer + policy setup
- Reports Worker = Equisoft background worker — same AddClientCredentialsTokenManagement
- No WorkSpace equivalent → Services.Authorization: the Equisoft-specific HTTP permission service

**New concept introduced — access keys and Services.Authorization:**
- Access keys: dot-separated permission strings (e.g. `shared.eapp.Lock`)
- Services.Authorization resolves an `identityRole` + `tenantId` from the JWT into a permit/deny
- This is an Equisoft-specific layer on top of standard JWT Bearer — JWT validation still runs first
- In WorkSpace terms: replaces local `IAuthorizationRequirement` handlers with an HTTP call

**New abstraction — IIdentityContext:**
- Wraps `HttpContext.User.FindFirstValue()` with Equisoft claim names
- `.TenantId` → "tenantId" claim, `.IdentityRole` → "identityRole" claim, `.UserId` → "sub"
- Preferred over direct claim access in production code (testable, claim-name-stable)

**Claim name differences:**
- WorkSpace: `tenant_id`, `role`
- Equisoft IdG: `tenantId`, `identityRole`

**Reading order for Lessons 1–11 now established:**
- Priority: L4 (Authorization Service) → L6 (New API Service) — these are the applied Equisoft patterns
- L1–L3: orientation and token anatomy, best read after the mapping is understood
- L7–L11: advanced patterns (guest auth, external providers, SSO) — later module content

**Module 6 status:** Bridge lesson done. Next: Lesson 4 (Authorization Service detail) or Lesson 6 (New API service) — whichever the learner chooses to deepen first.
