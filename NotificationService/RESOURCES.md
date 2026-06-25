# Notification Service Resources

## Knowledge

- [ASP.NET Core SignalR Introduction — Microsoft Docs](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
  Authoritative overview of SignalR, hubs, and the connection model. Use for: understanding hubs, client methods, groups, and the WebSocket lifecycle.

- [ASP.NET Core SignalR Hubs — Microsoft Docs](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs)
  Deep dive into hub classes, IHubContext, client method invocation, and groups. Use for: understanding how the server pushes messages to specific clients outside of a hub class.

- [Scale out SignalR with Redis backplane — Microsoft Docs](https://learn.microsoft.com/en-us/aspnet/core/signalr/redis-backplane)
  Explains why Redis is needed for horizontal scaling and how the backplane works. Use for: understanding why Redis is critical and what breaks without it.

- [Polly: resilience and transient-fault-handling library](https://github.com/App-vNext/Polly)
  Official Polly wiki and documentation. Use for: understanding the circuit breaker pattern and how it wraps Redis calls in this service.

- [StackExchange.Redis documentation](https://stackexchange.github.io/StackExchange.Redis/)
  The Redis client used (via the DIT framework). Use for: connection multiplexing, retry policies, and timeout behaviour.

## Gaps

- No internal documentation found for DigitalInsuranceTools (DIT) — this is an Equisoft-internal package. Deep understanding of DIT abstractions requires access to the internal repos or a team member who owns it.
