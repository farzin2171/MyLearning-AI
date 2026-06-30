---
name: capstone-is-built
description: Lesson 27 — WorkSpace IS scaffold, Config.cs, test users, IProfileService, verified running
metadata:
  type: project
---

The learner has walked through building the WorkSpace IS project step by step.

**Files created in WorkSpace IS project:**
- `Config.cs` — IdentityResources, ApiScopes (with tenant_id/role userClaims), Clients (workspace-web + reports-worker)
- `Services/TestUserStore.cs` — alice (tenant-acme, admin) and bob (tenant-globex, user)
- `Services/WorkSpaceProfileService.cs` — IProfileService reading tenant_id/role/email from test users
- `Program.cs` — AddIdentityServer() + .AddTestUsers() + .AddProfileService<WorkSpaceProfileService>() + .AddDeveloperSigningCredential()
- `Properties/launchSettings.json` — port 5001

**Three verification URLs:**
- `https://localhost:5001/.well-known/openid-configuration` — discovery doc
- `https://localhost:5001/.well-known/openid-configuration/jwks` — JWKS public key
- `https://localhost:5001/Account/Login` — QuickStart login page (alice/alice or bob/bob)

**Next: Lesson 28 — Build Calendar API and Reports Worker**
- Calendar API at port 5003 with JWT Bearer, scope policies, EventOwnerRequirement
- Reports Worker with Duende.AccessTokenManagement and named HttpClient
