---
name: deployment-slots-covered
description: Zero-downtime deploys via Azure App Service deployment slots — deploy→smoke test→swap pattern
metadata:
  type: project
---

# Deployment slots — zero-downtime pattern taught

Lesson 14 extended the Lesson 13 capstone pipeline with the standard production pattern for
Azure App Service: deploy to a staging slot, smoke test it, then swap to production.

**Core concept:** A slot is a second live instance on the same App Service Plan. Deploy to staging
(users unaffected), verify it passes a health check, swap atomically. The previous version lands
in staging and is available for instant rollback.

**New YAML tasks introduced:**
- `AzureWebApp@1` with `deployToSlotOrASE: true`, `resourceGroupName`, `slotName: 'staging'`
- `AzureAppServiceManage@0` with `Action: 'Swap Slots'`, `SourceSlot: 'staging'`
- `curl` smoke test script: exits 1 if health endpoint does not return HTTP 200

**New variable group addition:** `resourceGroupName` — required by the swap task (not needed by
direct deploy tasks, which is why it was absent in Lesson 13).

**Sticky settings taught:** Settings marked "Deployment slot setting" in the Azure portal stay
pinned to their slot during a swap. Critical for database connection strings — production should
never point at the staging DB after a swap, and vice versa. Non-sticky settings (like
ASPNETCORE_ENVIRONMENT=Production) travel with the swap as expected.

**Rollback:** Re-running the swap task returns the old version from staging to production in ~15s.
No build, no re-deploy.

**Tier restriction:** Standard (S1) or above required. Free/Shared/Basic do not support slots —
a common blocker on dev environments.

**What was NOT taught:**
- Auto-swap (Azure swaps automatically after warm-up, no pipeline step) — simpler but no
  pipeline control
- Traffic routing percentage (send 10% of traffic to staging before full swap)
- Multi-phase swap (two-step swap for sticky-setting edge cases)
- `AzureAppServiceSettings@1` for setting sticky flags from the pipeline
