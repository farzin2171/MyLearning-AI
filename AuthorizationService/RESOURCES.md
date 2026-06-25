# Authorization Service Resources

## Knowledge

- [Codebase: C:\work\Services.Authorization](C:\work\Services.Authorization)
  The primary source of truth. Always prefer the code over any summary. Use for: understanding current behavior, tracing flows, checking configuration.

- [Microsoft Docs: Claims-based identity model](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/secure-net-microservices-web-applications/)
  Foundational background on JWT, claims, and role-based access in .NET microservices. Use for: understanding WHY the auth patterns in this service exist.

- [Microsoft Docs: ASP.NET Core Authorization](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/introduction)
  Core framework docs. Use for: understanding IAuthorizationService, policies, requirements, and how the custom filters sit on top.

- [Martin Fowler: Access Control List pattern](https://martinfowler.com/articles/patterns-of-distributed-systems/access-control-list.html)
  High-trust architectural pattern reference. Use for: understanding WHY the Policy/Role/Permission model is structured as it is.

- [Microsoft Docs: Polly resilience library](https://learn.microsoft.com/en-us/dotnet/core/resilience/)
  Use for: understanding the circuit breaker pattern that protects Redis fallback to in-memory cache.

- [Microsoft Docs: IMemoryCache vs IDistributedCache](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/overview)
  Use for: understanding the two-tier caching strategy (Redis primary + in-memory fallback).

## Wisdom (Communities)

- Internal team — primary source of wisdom for business rules and history. Permission model decisions live in team memory and Confluence, not just code.

## Gaps

- No architectural decision record (ADR) found for the External Role Provider plugin design — the rationale for choosing a factory/priority model is implicit in code only.
- No documented SLA or performance budget for the /authorize endpoint latency.
