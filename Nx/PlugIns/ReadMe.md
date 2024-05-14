# Nx Plugins

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Preparations](#preparations)

<!-- /code_chunk_output -->

## Preparations

See [Nx Schema](./schemas/v18.0.8/nx-schema.json) for the current used version.

```shell
# Install Nx CLI
npm i -g nx@latest

# Generate a nx plugin in previously created workspace
nx generate @nx/plugin:plugin plugin-name \
--importPath=@global-project-name/plugin-name \
--directory=app-plugins/nx/plugin-name
```

## Register the Plugin

```shell
# Register the plugin in the workspace
nx g @nx/plugin:add plugin-name
```
