# Correction: Notifications Use SignalR User Routing, Not a Redis Lookup

Lesson 1 described the notification delivery as: "controller looks up the connectionId from Redis." The actual code shows this is wrong. `NotificationsController` calls `_hubContext.Clients.User(viewModel.UserId).SendAsync(...)` — it delegates routing entirely to SignalR's built-in user provider. No Redis lookup occurs in the notifications path.

The Redis application cache (`KeepAliveManagementService`) is used *only* in the keep-alive path, where the controller needs to target a specific set of connections by `applicationId + userId`. The two flows use different routing strategies for different reasons.

**Implications:** Future lessons must establish this split clearly before discussing the caching layer, otherwise the user will build the wrong mental model of what Redis is for in this service.
