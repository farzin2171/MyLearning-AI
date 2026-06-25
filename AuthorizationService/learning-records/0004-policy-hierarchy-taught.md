# Policy → Role → Permission hierarchy and access key format taught

Taught the core insight: access keys are dot-separated paths (Root.Child.Grandchild.PermissionKey) built by a recursive CTE in [dbo].[GetUserAccessKeys]. Only tblPolicy is hierarchical; roles and permissions are flat. A user is never assigned directly to a policy — the chain always goes: ExternalRole → junction tables (ExternalRoleToPermission / ExternalRoleToRole) → PolicyPermission / PolicyRole → Policy.

Covered PermissionGroup and how GetUserAccessKeysFromPermissionGroups enables OnBehalfOf intersection. Covered delete cascade implications for cache staleness.

Lesson included three predict-the-keys exercises for active retrieval practice.

**Implications:** User now has the complete mental model: providers → external roles → junction tables → policy tree → recursive CTE → access key list → cache → Allow/Deny. The next session should apply this to a real debugging scenario, which is the stated goal in the mission.
