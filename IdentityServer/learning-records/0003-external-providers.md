# User asked about external provider configuration (Azure B2C, Okta)

The user wants to teach their team how external identity providers are configured in the Identity Gateway. They pointed to `dit-base-config-common` as the configuration source. This topic was prompted by a specific practical need — likely onboarding devs who need to add or troubleshoot provider configs.

**Key insight from the codebase:** The `identityProviders.json` file is the single source of truth per environment. Providers are identified by a `Scheme` naming convention (`{TenantKey}_{ProviderType}`). Okta uses the `openidconnect` type — not a special type. The most dangerous footgun is provider-supplied claims that start with `client_` or `service_`, which cause a hard exception in `ExternalController.cs`.

**Implications:**
- Future lessons could go deeper on FederatedConfiguration (chained IdP auth) and dynamic provider loading from DB
- The `dit-base-config-common` repo should be mentioned as the place to make config changes (not the Identity Gateway source directly)
- Any new provider lesson should start with "open identityProviders.json" not "write C# code"
