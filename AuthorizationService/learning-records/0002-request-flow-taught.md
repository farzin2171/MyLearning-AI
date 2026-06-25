# Authorization request flow covered end-to-end

Taught the complete GET /authorize flow: controller → AuthorizeServiceFactory (4-way context selection) → AuthorizeCacheService (fast-path cache hit vs slow-path cache miss) → EvaluateServiceFactory → ExternalRolesService → AccessRepository (Dapper stored proc GetUserAccessKeys) → EvaluateCacheService (write to Redis with distributed lock) → Contains check → Allow/Deny.

Covered: OnBehalfOf special-case (two role lookups + intersection), circuit breaker / in-memory fallback, cache key formats per context.

**Implications:** User has the structural map of the service in their head. Next session should go one level deeper on External Role Providers — the five types, priority ordering, and failure modes. That is the layer most likely to produce production surprises.
