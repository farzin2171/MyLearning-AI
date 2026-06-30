# Teaching Notes

## User Profile
- Has existing knowledge of OpenID Connect and OAuth 2.0 conceptually
- Goal is onboarding their development team, not personal learning alone
- Uses the Equisoft ecosystem: Duende IdentityServer (IdG), Services.Authorization, Services.AssistantManagement

## Teaching Approach
- Skip rehashing basics — connect every concept directly to the real codebase
- Prefer concrete code examples from the actual services over abstract diagrams
- Interactive quizzes should use real terms from the ecosystem (e.g. `identityRole`, `tenantId`, access keys)
- Each lesson should leave the developer able to DO something specific, not just understand something

## Lesson Pacing
- Assume ~20-30 minutes per lesson
- Prioritize the "big picture then drill down" approach
- Lessons should be completable by a new developer on day 1-2 of onboarding

## Format Preferences
- Grounded in real code and real service names (Equisoft track)
- Generic track lessons must work with zero Equisoft codebase access
- Mix approach: concepts first across multiple lessons, then one capstone coding module
- Exercises in generic track use generic examples (calendar, contacts, banking) not Equisoft

## Course Structure (as of 2026-06-29)
- Generic track: Lessons 12–29 (OAuth foundations → OIDC → Duende IS → microservices → capstone)
- Equisoft track: Lesson 30 + existing Lessons 1–11
