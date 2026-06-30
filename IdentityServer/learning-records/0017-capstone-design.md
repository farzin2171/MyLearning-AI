---
name: capstone-design
description: Lesson 26 — WorkSpace capstone system design: IS + Calendar API + Contacts API + Web + Reports Worker
metadata:
  type: project
---

The learner has completed the capstone design lesson and has the full system blueprint.

**System: WorkSpace**
- WorkSpace IS: https://localhost:5001 — Duende IS 7.x, QuickStart UI
- WorkSpace Web: https://localhost:5002 — ASP.NET Core MVC, OIDC Auth Code + PKCE (public client)
- Calendar API: https://localhost:5003 — JWT Bearer, calendar.read/write scopes, EventOwnerRequirement
- Contacts API: https://localhost:5004 — JWT Bearer, contacts.read/write scopes, same-tenant policy
- Reports Worker: no port — Client Credentials, reads Calendar + Contacts

**Key design decisions locked:**
- WorkSpace Web: public client (no secret), PKCE, AllowOfflineAccess = true
- Reports Worker: confidential client, Client Credentials only
- Access token carries: sub, scope, tenant_id, role (via IProfileService)
- ID token carries: sub, name, email only (no auth claims)
- Calendar delete: imperative EventOwnerRequirement (resource-based — event must be loaded first)
- Development: AddDeveloperSigningCredential(); production: AddSigningCredential(cert)
- User store: TestUserStore for development

**Build order for Lessons 27–29:**
- L27: WorkSpace IS (Config.cs, QuickStart UI, IProfileService, verify discovery)
- L28: Calendar API + Reports Worker (JWT Bearer, policies, token management)
- L29: WorkSpace Web (OIDC login, call API with user token, end-to-end smoke test)
