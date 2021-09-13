# Nx generated "angular.json"

> Last Update: September 2021
> Similar Content: <https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/>

<!-- prettier-ignore-start -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx generated "angular.json"](#nx-generated-angularjson)
  - [JSON Angular Workspace Schema](#json-angular-workspace-schema)
  - [Main Structure](#main-structure)
    - [version](#version)
    - [newProjectRoot](#newprojectroot)
    - [projects](#projects)
    - [cli](#cli)
      - [defaultCollection](#defaultcollection)
      - [packageManager](#packagemanager)
      - [warnings](#warnings)
        - [versionMismatch: true/false](#versionmismatch-truefalse)
      - [analytics: boolean/string](#analytics-booleanstring)
      - [analyticsSharing](#analyticssharing)
    - [schematics](#schematics)
  - [Projects](#projects-1)
    - [projectType](#projecttype)
    - [root](#root)
    - [sourceRoot](#sourceroot)
    - [prefix](#prefix)
    - [schematics](#schematics-1)
    - [architect](#architect)

<!-- /code_chunk_output -->

<!-- prettier-ignore-end -->

## JSON Angular Workspace Schema

Based on JSON Angular Workspace Schema:

```js
"$schema": "http://json-schema.org/draft-07/schema",
"$id": "ng-cli://config/schema.json",
"title": "Angular CLI Workspace Configuration",
"type": "object",
'properties':
  '$schema',
  'version',
  'cli',
  'schematics',
  'newProjectRoot',
  'defaultProject',
  'projects'
'additionalProperties',
'required',
'definitions':
  'cliOptions',
  'schematicOptions',
  'fileVersion',
  'project',
  'global'
```

## Main Structure

### version

The configuration-file version.

### newProjectRoot

Default project name to use in commands, where not provided as an argument. When you use ng new to create a new application in a new workspace, that application is the default project for the workspace until you change it here.

### projects

An Objects of objects:

```js
"projects": {
  "my_app_name": {
    ...
  }
  ...
}
```

### cli

Example: `"defaultCollection": "@nrwl/angular"`,

#### defaultCollection

#### packageManager

`"enum": ["npm", "cnpm", "yarn", "pnpm"]`

#### warnings

##### versionMismatch: true/false

Show a warning when the global version is newer than the local one.

#### analytics: boolean/string

Share anonymous usage data with the Angular Team at Google.

#### analyticsSharing

### schematics

More Information online: <https://angular.io/guide/glossary#schematic>

A set of schematics that customize the `ng generate` sub-command option defaults for this workspace.

- `'@schematics/angular:application'`,
- `'@schematics/angular:class'`,
- `'@schematics/angular:component'`,
- `'@schematics/angular:directive'`,
- `'@schematics/angular:enum'`,
- `'@schematics/angular:guard'`,
- `'@schematics/angular:interceptor'`,
- `'@schematics/angular:interface'`,
- `'@schematics/angular:library'`,
- `'@schematics/angular:pipe'`,
- `'@schematics/angular:ng-new'`,
- `'@schematics/angular:resolver'`,
- `'@schematics/angular:service'`,
- `'@schematics/angular:web-worker`'

## Projects

These are the all available project-properties (re-check) at time of writing (fished out from source files):

- 'projectType', &#10004;
- 'root', &#10004;
- 'sourceRoot', &#10004;
- 'prefix', &#10004;
- 'schematics', &#10004;
- 'architect', &#10004;

**Not documented:**

- 'cli', &rarr; &rarr;
- 'i18n', &rarr; &rarr;
- 'targets' &rarr; &rarr;

### projectType

One of "**application**" or "**library**". An application can run independently in a browser, while a library cannot.

**Example:** `"projectType": "application"`

### root

The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace.

**Example:** `"root": "apps/my-app"`

### sourceRoot

The root folder for this project's source files.

**Example:** `"sourceRoot": "apps/my-app-name/src"`

### prefix

A string that Angular prepends to generated selectors. Can be customized to identify an application or feature area.

**Example:** `"prefix": "app"`

### schematics

### architect
