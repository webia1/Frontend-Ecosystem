# Nx Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Create a workspace](#create-a-workspace)
- [Add a project](#add-a-project)
- [Rename a project](#rename-a-project)
- [Add Thirdpary](#add-thirdpary)
- [Add Formly](#add-formly)
- [Update & Upgrade](#update--upgrade)
- [Adding Nx to an Existing Repository](#adding-nx-to-an-existing-repository)

<!-- /code_chunk_output -->

## Create a workspace

```shell
npx create-nx-workspace@latest
```

## Add a project

```shell
nx g @nrwl/angular:app another-app
```

## Rename a project

```shell
nx g @nrwl/workspace:move --project old-app new-app
```

## Add Thirdpary

## Add Formly

```shell
# At the root of the workspace
npm install @ngx-formly/core @ngx-formly/material --save
npm install @ngx-formly/schematics --save-dev
```

## Update & Upgrade

```shell

# Migrate Nx to the latest version
nx migrate latest
# if migration.json is created
nx migrate --run-migrations=migrations.json

# Update Nx to the latest version
nx update @nrwl/workspace

# Update all packages to the latest version
npx npm-check-updates -u
npm install
```

## Adding Nx to an Existing Repository

Run:

```shell
npx nx@latest init
```
