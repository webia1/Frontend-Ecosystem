# Nx Cookbook (Denglish)

> Project Example here: <https://github.com/webia1/ng16-elements>

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Overview](#overview)
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Install Nx CLI Globally](#install-nx-cli-globally)
    - [Add Other Nx CLI's (Locally)](#add-other-nx-clis-locally)
  - [Create a workspace](#create-a-workspace)
  - [Add a project](#add-a-project)
  - [Rename a project](#rename-a-project)
  - [Add Thirdpary](#add-thirdpary)
  - [Add Formly](#add-formly)
  - [Update & Upgrade](#update--upgrade)
  - [Adding Nx to an Existing Repository](#adding-nx-to-an-existing-repository)
  - [Create a shared library, e.g. formly](#create-a-shared-library-eg-formly)
  - [Create new libraries on a certain place](#create-new-libraries-on-a-certain-place)
    - [Create new a Component within a Module within a Library](#create-new-a-component-within-a-module-within-a-library)
    - [Create a new Standalone Component within a Library](#create-a-new-standalone-component-within-a-library)
    - [Nx/Storybook](#nxstorybook)
- [Nx MonoRepo v16+ und Angular Apps v16+](#nx-monorepo-v16-und-angular-apps-v16)
  - [Shared Libraries](#shared-libraries)
  - [Storybook für Visualisierung](#storybook-für-visualisierung)
    - [Beispiel: LoginComponent](#beispiel-logincomponent)
  - [Angular Elements für Wiederverwendung](#angular-elements-für-wiederverwendung)
    - [Beispiel: LoginComponent als Angular Element](#beispiel-logincomponent-als-angular-element)
  - [Nx Console](#nx-console)
    - [Move Project](#move-project)
    - [Remove Project](#remove-project)
    - [Flat Config](#flat-config)
    - [Fix Configuration](#fix-configuration)
    - [PlugIns](#plugins)
  - [Mögliche Fallen & Stolpersteine](#mögliche-fallen--stolpersteine)
    - [Standalone-Komponenten](#standalone-komponenten)
    - [Angular Elements](#angular-elements)
    - [Event Handling in Angular Elements](#event-handling-in-angular-elements)
    - [Build-Prozess](#build-prozess)
- [Backup](#backup)
  - [Useful Commands](#useful-commands)
  - [Standard Tags](#standard-tags)

<!-- /code_chunk_output -->

## Overview

- Workspaces
- Code-Generatoren
- Dependency Graph
- Affected Commands
- Build Caching
- Code-Sharing
- Linting
- Testing
- E2E Tests
- DevServer
- Plugins
- Schematics
- Executors

## Introduction

Short summary of the current NxMonoRepo packages and their purpose.

1. **Storybook Integration**: Support for frameworks like React, Angular, Vue, configuration and interaction tests.
2. **Cypress**: Component testing and migration guides.
3. **Deno**: Project support and serverless deployment.
4. **Next.js and Nuxt**: Plugin configuration and deployment support.
5. **Vite and Webpack**: Configurations and plugins.
6. **Module Federation**: Creating Host and Remote applications, module federation.
7. **Enforce Module Boundaries**: Various tagging and import options.
8. **Installation and Updates**: Installation guides for different repository types.
9. **Tips and Tricks**: ESLint configuration with TypeScript, TypeScript Batch Mode, environment variables, etc.
10. **Troubleshooting**: Solving circular dependencies, installation issues, cache misses.
11. **Nx Console**: Telemetry, command generation, keyboard shortcuts.
12. **Integration with Various Technologies**: Creating projects with Express, Lit, Solid, Qwik, Rust, .NET, Nuxt, Astro, Vue, Svelte, Fastify, and more.
13. **Benchmarks**: Various performance measurements.

## Getting Started

### Install Nx CLI Globally

```shell
npm i -g @nrwl/cli@latest
```

#### Add Other Nx CLI's (Locally)

```shell
npm i -D @nx/linter @nx/storybook @nx/workspace @nx/devkit @nx/eslint @nx/eslint-plugin @nx/jest @nx/js @nx/playwright @nx/workspace
```

### Create a workspace

```shell
npx create-nx-workspace@latest
npm i -g @nrwl/cli@latest
```

### Add a project

```shell
nx g @nrwl/angular:app another-app
```

### Rename a project

```shell
nx g @nrwl/workspace:move --project old-app new-app
```

### Add Thirdpary

### Add Formly

```shell
# At the root of the workspace
npm install @ngx-formly/core @ngx-formly/material --save
npm install @ngx-formly/schematics --save-dev
```

### Update & Upgrade

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

### Adding Nx to an Existing Repository

Run:

```shell
npx nx@latest init
```

### Create a shared library, e.g. formly

```shell
# example with formly
# At the root of the workspace
nx g @nrwl/angular:lib formly --buildable --directory=shared
npm install @ngx-formly/core @ngx-formly/material --save
```

### Create new libraries on a certain place

```shell
nx generate @nx/angular:library apps-shared-libs/reusables
```

#### Create new a Component within a Module within a Library

```shell
# New component within an existing module
nx generate @nx/angular:component login --project=apps-shared-libs/reusables --module=reusables.module.ts --path=apps-shared-libs/reusables/src/lib/apps-shared-libs/components/
```

#### Create a new Standalone Component within a Library

```shell
# New Standalone Component
nx generate @nx/angular:component login --project=apps-shared-libs/reusables --standalone

```

#### Nx/Storybook

```shell
nx g @nx/angular:storybook-configuration apps-shared-libs/reusables
# IF THERE ARE NO DECLARATIONS ARRAY
# no stories generated because there were no components declared
# in apps-shared-libs/reusables/src/lib/reusables.module.ts.
# Hint: you can always generate stories later with the
# nx generate @nx/#angular:stories --name=apps-shared-libs/reusables
# command.
nx run apps-shared-libs/reusables:storybook
```

---

## Nx MonoRepo v16+ und Angular Apps v16+

### Shared Libraries

- Shared Libraries im Nx MonoRepo bieten eine Möglichkeit, wiederverwendbare Codebestandteile zu organisieren.
- Standalone-Komponenten können in Shared Libraries integriert werden, erfordern jedoch manuelle Konfiguration.

### Storybook für Visualisierung

- Storybook kann zur Visualisierung von Komponenten in Shared Libraries verwendet werden.
- Manuelle Konfiguration ist erforderlich, um Standalone-Komponenten in Storybook darzustellen.

#### Beispiel: LoginComponent

- `LoginComponent` ist eine Standalone-Komponente in einer Shared Library.
- Manuelle Anpassungen in der Storybook-Konfiguration sind erforderlich, um diese Komponente darzustellen.

### Angular Elements für Wiederverwendung

- Angular Elements ermöglichen die Verpackung von Angular-Komponenten als wiederverwendbare Custom Elements.
- Diese können dann in anderen Angular-Anwendungen oder sogar in reinen HTML-Seiten verwendet werden.

#### Beispiel: LoginComponent als Angular Element

- `LoginComponent` kann als Angular Element verpackt und in anderen Projekten wiederverwendet werden.
- Manuelle Konfiguration und Build-Prozesse sind erforderlich, um dies zu erreichen.

### Nx Console

#### Move Project

```shell
nx workspace-generator move --project=project-name --destination=new-dir
```

#### Remove Project

```shell
nx g @nx/workspace:remove <app-name>
```

#### Flat Config

<https://nx.dev/recipes/tips-n-tricks/flat-config>

```shell
nx g @nx/linter:convert-to-flat-config
```

#### Fix Configuration

```shell
nx g @nx/workspace:fix-configuration
```

#### PlugIns

```shell
npm install --save-dev @nx/nx-plugin
nx g @nx/nx-plugin:plugin <my-plugin>
nx g @nx/nx-plugin:generator clone-project --project=<my-plugin>
nx generate <my-plugin>:clone-project --weitereOptionen
```

### Mögliche Fallen & Stolpersteine

#### Standalone-Komponenten

- Standalone-Komponenten in Shared Libraries erfordern besondere Aufmerksamkeit, da sie (zum Zeitpunkt des Erfassens dieses Dokumentes noch) nicht automatisch von Nx oder Storybook erkannt werden.
- Manuelle Konfiguration in der Storybook-Datei ist erforderlich, um solche Komponenten darzustellen.

#### Angular Elements

- Die Umwandlung einer Standalone-Komponente in ein Angular Element erfordert manuelle Schritte, einschließlich der Anpassung der `main.ts` und der `project.json`.
- Die Verwendung von Angular Elements in anderen Angular-Anwendungen kann zu Konflikten führen, wenn die Komponente nicht korrekt registriert ist.

#### Event Handling in Angular Elements

- Das Event-Handling in Angular Elements kann unterschiedlich sein. Beispielsweise wird das `$event`-Objekt als `CustomEvent` behandelt, und die Daten werden im `detail`-Feld gespeichert.

#### Build-Prozess

- Ein spezieller Build-Prozess ist erforderlich, um Angular Elements zu generieren, insbesondere wenn sie in einer Shared Library enthalten sind.
- Die `tsconfig.json` und `project.json` müssen manuell angepasst werden, um den Build-Prozess zu unterstützen.

## Backup

### Useful Commands

```shell
nx reset
nx g @nx/workspace:fix-configuration
nx dep-graph

```

### Standard Tags

```shell
type:ui
type:data-access
type:util
type:feature
```
