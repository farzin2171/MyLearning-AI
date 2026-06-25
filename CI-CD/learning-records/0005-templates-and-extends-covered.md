# Templates and extends: taught — four template types, compile-time conditionals, each loops

Lesson 4 covered the extends: vs template: distinction, the resources.repositories @alias pattern, the four template types (step/job/stage/pipeline), typed parameters (string/boolean/object/step), ${{ if }} compile-time conditionals, ${{ each }} loops over object parameters, and the coalesce() function — all illustrated with real code from PipelineTemplates.

**Key practical insight taught:** The team's app repos use extends: for security-boundary pipeline inheritance; inside PipelineTemplates, templates call each other with relative template: references (no @alias needed).

**Implications:** The user can now read any pipeline file in the team's style. The next productive gap is artifacts — how PublishPipelineArtifact/DownloadPipelineArtifact handoff between stages, which is the glue between the Build and Publish stages they've now seen in multiple templates.
