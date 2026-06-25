# Azure CI/CD Resources

## Knowledge

- [YAML schema reference for Azure Pipelines — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/?view=azure-pipelines)
  The authoritative YAML spec: every key, every option, every default. Use for: verifying syntax, finding obscure properties, debugging schema errors.

- [Key Azure Pipelines concepts — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts?view=azure-devops)
  Glossary of stages, jobs, steps, triggers, agents, artifacts. Use for: building the mental model; excellent first read for any new concept.

- [Stages in Azure Pipelines — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/stages?view=azure-devops)
  How to define, order, and gate stages; dependsOn, conditions, approvals. Use for: multi-stage pipeline structure.

- [Jobs in Azure Pipelines — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/phases?view=azure-devops)
  Job types (regular, deployment, container), parallelism, dependencies. Use for: job-level design questions.

- [Configure pipeline triggers — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops)
  CI triggers, PR triggers, scheduled triggers, pipeline completion triggers. Use for: all trigger-related questions.

- [Build and deploy a Node.js web app — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/nodejs-tutorial?view=azure-devops)
  End-to-end Node.js pipeline to Azure App Service. Use for: JS/TS project pipeline examples.

- [Pipelines for JavaScript apps — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/customize-javascript?view=azure-devops)
  npm, Yarn, Node version management, caching, publishing artifacts. Use for: JS-specific pipeline tasks and patterns.

- [YAML templates — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops)
  Reusable templates for jobs, steps, stages, and variables. Use for: DRY pipelines in team settings.

- [Azure Pipelines task reference — Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/?view=azure-pipelines)
  Full catalogue of built-in tasks. Use for: finding the right task name and its required inputs.

## Wisdom (Communities)

- [Azure DevOps Developer Community](https://developercommunity.visualstudio.com/AzureDevOps)
  Official bug reports and feature requests. Use for: checking if a bug is known.

- [Stack Overflow: azure-devops-pipelines tag](https://stackoverflow.com/questions/tagged/azure-devops-pipelines)
  High-traffic Q&A. Use for: specific YAML syntax errors and common configuration questions.

- [r/devops — Reddit](https://reddit.com/r/devops)
  General DevOps discussion with Azure content. Use for: architecture opinions, real-world patterns.
