# Design: One Active Connection Per User Per ApplicationId

`KeepAliveManagementService.LinkAsync` enforces a single active connection per `userId + applicationId` pair. When a browser reconnects with the same `applicationId`, the old entry is removed from the list and the new one appended — the connection is replaced, not accumulated.

This is intentional. The `applicationId` is a Guid the front-end generates to identify one application instance (browser tab or app). If the user refreshes, the browser reuses the same `applicationId`, so the service never accumulates stale connections per application. Different tabs get different `applicationId` values and are tracked independently.

**Implications:** Keep-alive signals are always sent to the user's *current* connection for a given application. A stale connection left over from before a browser refresh will never receive keep-alive signals — it has been evicted from the cache.
