# Variables, variable groups, and output variables taught using team templates

Lesson 3 covered the three expression syntaxes ($(macro), ${{template}}, $[runtime]), variable groups (Pipeline_Main, pipeline-templates), secret variable mapping via env:, the branch-detection runtime expression pattern, and the ##vso[task.setvariable;isOutput=true] output variable pattern — all demonstrated with real code from the team's PipelineTemplates repo.

**Implications:** The next gap is the `extends:` / `template:` composition pattern — how app repos consume the PipelineTemplates repo and how typed parameters work. That unlocks the ability to read and write any pipeline in the team's style.
