# Mission: Understanding the Notification Service

## Why
You are taking ownership of the Notification Service at Equisoft. To maintain, extend, and debug this service confidently, you need to deeply understand how it works — from the real-time SignalR transport to the Redis-backed connection registry to the resilience patterns that keep it alive when dependencies fail.

## Success looks like
- You can explain the end-to-end notification flow to a new team member without referring to notes
- You can trace a "notification not arriving" bug through every layer of the system
- You can safely add a new notification type or modify the keep-alive flow
- You know what operational impact to expect when Redis is degraded

## Constraints
- Learning happens in sessions — build progressively, not by cramming
- Ground everything in the actual production code, not toy examples

## Out of scope
- Rewriting or refactoring the service (until knowledge is solid)
- Other microservices in the platform (for now)
