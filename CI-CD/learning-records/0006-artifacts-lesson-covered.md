# Pipeline artifacts taught — publish/download/download:none pattern

Lesson 5 covered the artifact handoff problem (fresh agent per stage), PublishPipelineArtifact@1 with the ArtifactStagingDirectory convention, the download: shorthand vs DownloadPipelineArtifact@2 task, and deployment-job auto-download vs `download: none`. All examples used the team's Node/TS + Octopus Deploy style from PipelineTemplates.

**Key practical insight taught:** Deployment jobs auto-download all artifacts by default — regular jobs do not. `download: none` is needed when a deployment job only triggers a remote action and doesn't need the files. Combined with `checkout: none`, a publish job touches neither source nor workspace — only the packaged artifact.

**Implications:** The user can now trace a full build→publish pipeline end-to-end. The next productive gap is **environments and approvals** — how the team gates deployments (environment: Production, required reviewers) and how that connects to the Octopus Deploy channels already seen in templates.
