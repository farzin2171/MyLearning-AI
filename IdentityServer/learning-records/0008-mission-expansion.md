# Mission expanded: generic OAuth/OIDC course added as prerequisite to Equisoft track

The user requested a complete ground-up course covering OAuth 2.0, OpenID Connect, Duende IdentityServer setup, and microservices auth — before the Equisoft-specific material. This is a deliberate mission expansion: the existing 11 lessons assumed prior OAuth/OIDC knowledge; the new curriculum builds that knowledge from scratch.

**Structure chosen:** generic track (Modules 1–5, Lessons 12–29) then Equisoft applied (Module 6, Lesson 30 → Lessons 1–11). The generic track must work without any Equisoft codebase access.

**Teaching format confirmed:** concepts-first approach across Module 1–4, then a single capstone coding module (Module 5) that builds a complete system. This avoids overwhelming learners with setup friction before they understand what they're building.

**Implications:**
- Lessons 12–29 treat the learner as coming in with no OAuth knowledge
- Equisoft lessons (1–11) are now framed as an advanced "applied" module, not an introduction
- The capstone (Lessons 27–29) produces a working .NET 8 + Duende IS reference project
