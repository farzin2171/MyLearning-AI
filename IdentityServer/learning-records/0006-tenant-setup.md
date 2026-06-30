# User asked how a new tenant is set up across the ecosystem

The user wants to understand the full process of provisioning a new tenant — what changes in the IDG, what application config is needed, and what database rows must be seeded.

**Core mental model:** A tenant is just a string key (e.g., "ACME"). The entire system is wired to get that key into a JWT as the `tenant` claim, and then use it to isolate data. Everything else is in service of that.

**Three-layer setup:**
1. **IDG config** (in `dit-base-config-common`): identity provider entry with `EcosystemTenant` property linking it to the tenant key; one user-facing client; one service-account client per service (`apply.NEWTENANT`, `userapi.NEWTENANT`, etc.)
2. **Application config** (appsettings): hostname mapping in `Multitenancy.TenantHostnames`; service-account secrets
3. **Database seeding**: Tenant row, Languages (en-CA default), SignatureSettings, WebApiConnector endpoints, CorsOrigins in Apply DB; matching Tenant row in Localization DB; TenantDomain in Configuration DB

**Key insight — EF Core query filters:** Apply's `ApplicationDbContext.OnModelCreating()` registers `HasQueryFilter` on every tenant-scoped entity. This means data isolation is automatic — but it also means tenant resolution must succeed *before* any DB call, otherwise the filter evaluates to `TenantId == 0` and returns nothing.

**The `EcosystemTenant` property is the tenant-IdP link:** It's how the IDG token generator knows which tenant key to inject into tokens for a user who authenticated via a given identity provider.

**Authoritative guide:** `C:\work\CLI.DataIngestionTool\docs\articles\tenantSetup.md` has a full JSON config template covering all services. This lesson is a conceptual complement, not a replacement.

**Missing-step failure table** (useful for debugging tenant provisioning):
- No IdP in IDG → login page shows no provider
- No `tenant` claim on client → all services see no tenant
- No service-account clients → 401 on all service-to-service calls
- No hostname mapping → wrong tenant or 404 in browser
- No DB Tenant row → null reference or empty EF results
- No Language rows → form rendering fails
- No CorsOrigin → preflight CORS failures
- No Localization Tenant row → all strings empty or default

**Implications for future lessons:**
- How to configure Services.User connector handlers for a new tenant (Azure Graph app registration, connector JSON)
- Multi-tenant secrets management: how service-account secrets are rotated across environments
