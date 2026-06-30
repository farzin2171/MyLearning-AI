---
name: capstone-apis-built
description: Lesson 28 — Calendar API and Reports Worker built; JWT Bearer, EventOwnerRequirement, token management
metadata:
  type: project
---

The learner has built two capstone projects.

**Calendar API (port 5003):**
- JWT Bearer with Authority = https://localhost:5001; ValidateAudience = false (dev shortcut)
- Policies: CanReadCalendar (RequireClaim scope calendar.read), CanWriteCalendar (calendar.write)
- EventOwnerRequirement + EventOwnerHandler: compares token tenant_id to event TenantId
- GET /api/calendar: filters events by caller's tenant_id claim (no cross-tenant leakage)
- DELETE /api/calendar/{id}: requires write scope + imperative ownership check
- BackchannelHttpHandler bypass for self-signed dev cert (production: real cert)

**Reports Worker:**
- AddClientCredentialsTokenManagement + AddClientCredentialsHttpClient
- Token cached ~59 min; ~1 call to /connect/token per 60-min window
- No tenant_id in machine token → GetEvents returns empty list (correct, by design)

**Key insight confirmed:** Machine tokens carry no user-derived claims — tenant isolation works by claim presence, not by magic. A worker that needs to read all tenants requires a different design (elevated scope + explicit cross-tenant logic).

**Next: Lesson 29 — Build WorkSpace Web**
- ASP.NET Core MVC + AddOpenIdConnect
- OIDC login flow, user's access token forwarded to Calendar API
- End-to-end smoke test of the complete system
