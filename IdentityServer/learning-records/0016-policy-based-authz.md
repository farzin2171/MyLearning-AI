---
name: policy-based-authz
description: Lesson 25 — three-tier authorization in ASP.NET Core (simple policies, custom requirements, imperative)
metadata:
  type: project
---

The learner has completed Module 4 with the policy-based authorization lesson.

**Established knowledge:**
- Three tiers: simple (RequireClaim/RequireRole/RequireAssertion) → custom requirement+handler → imperative (IAuthorizationService)
- Multiple [Authorize] attributes are additive — all policies must pass
- IAuthorizationRequirement is a data class only; AuthorizationHandler<T> contains the logic and can inject services
- Handler pipeline: all handlers run; any ctx.Fail() blocks access; all requirements must have at least one Succeed to grant access
- Neutral handler (neither Succeed nor Fail) leaves decision to other handlers
- Imperative authorization: inject IAuthorizationService, call AuthorizeAsync(User, resource, policyName) inside the action body
- Use imperative when the decision depends on a specific loaded resource (ownership checks etc.)
- Register custom handlers as IAuthorizationHandler in DI

**Module 4 complete.** Lessons 23–25 finished:
- 23: JWT Bearer middleware — protect an API
- 24: Client Credentials — acquire and cache service tokens
- 25: Policy-based authorization — fine-grained enforcement

**Next: Module 5 — Capstone (Lessons 26–29)**
The capstone pulls everything together into a running system: Duende IS + two protected APIs + a client web app.
