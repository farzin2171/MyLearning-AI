# Mission: Equisoft Authorization Service

## Why
The Authorization Service is one of the most critical microservices on the platform — every other service relies on it to decide who can do what. Understanding it deeply means being able to confidently work on it, debug authorization failures, design new policies, and reason about security decisions across the entire platform.

## Success looks like
- Explain how an authorization request flows from an API call through policy evaluation to a decision
- Understand the four identity contexts (User, ServiceAccount, Guest, OnBehalfOf) and when each applies
- Read and interpret the Policy → Role → Permission hierarchy and predict what access a user will have
- Know how External Role Providers work and how adding/changing one affects authorization outcomes
- Debug common authorization failures (denied access, missing policies, stale cache) confidently
- Understand the caching strategy (Redis + memory fallback) and its implications for consistency

## Constraints
- Learning in the context of real work — lessons should connect to the actual codebase at C:\work\Services.Authorization
- The service is .NET 8 / EF Core — assume familiarity with C# and ASP.NET Core patterns

## Out of scope
- Deep dives into tenant configuration management (covered separately)
- OIPA internals (separate service — only how Authorization calls it matters)
- Azure AD / Microsoft Graph administration
