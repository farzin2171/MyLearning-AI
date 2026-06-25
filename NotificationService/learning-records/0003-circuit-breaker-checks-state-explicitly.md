# The Cache Manager Checks Circuit State Explicitly Before ExecuteAsync

`NotificationServiceCacheManager.GetAsync` and `SetAsync` both check `_circuitBreakerPolicy.CircuitState == CircuitState.Open` *before* calling `ExecuteAsync`. This is an early exit: when the circuit is already open, the code skips `ExecuteAsync` entirely and goes straight to in-memory fallback. The Polly `CircuitBreakerAsync` would fast-fail `ExecuteAsync` when open anyway (throwing `BrokenCircuitException`), but the explicit check is cleaner — it avoids the overhead and exception handling path.

The practical implication: the fallback is the default code path during a Redis outage, not the exception handler. This matters when reading the code — the `catch (Exception)` block is not the only entry to `FallbackToInMemoryCache`.
