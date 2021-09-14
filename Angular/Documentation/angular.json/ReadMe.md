# Nx generated "angular.json"

> Last Update: September 2021
> Similar Content: <https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/>

<!-- prettier-ignore-start -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx generated "angular.json"](#nx-generated-angularjson)
  - [JSON Angular Workspace Schema](#json-angular-workspace-schema)
    - [First Level - Overview](#first-level-overview)
      - [$schema](#schema)
      - [$id](#id)
      - [title](#title)
      - [type](#type)
      - [additionalProperties](#additionalproperties)
      - [required](#required)
      - [properties](#properties)
        - [properties.$schema](#propertiesschema)
        - [properties.version](#propertiesversion)
        - [properties.cli](#propertiescli)
        - [properties.schematics](#propertiesschematics)
        - [properties.newProjectRoot](#propertiesnewprojectroot)
        - [properties.defaultProject](#propertiesdefaultproject)
        - [properties.projects](#propertiesprojects)
      - [definitions](#definitions)
        - [definitions.cliOptions](#definitionsclioptions)
        - [definitions.schematicOptions](#definitionsschematicoptions)
        - [definitions.fileVersion](#definitionsfileversion)
        - [definitions.project](#definitionsproject)
          - [definitions.project.type](#definitionsprojecttype)
          - [definitions.project.properties -> Important Details](#definitionsprojectproperties-important-details)
          - [definitions.project.required](#definitionsprojectrequired)
          - [definitions.project.anyOf](#definitionsprojectanyof)
          - [definitions.project.additionalProperties](#definitionsprojectadditionalproperties)
          - [definitions.project.patternProperties](#definitionsprojectpatternproperties)
          - [definitions.project.definitions -> Important Details](#definitionsprojectdefinitions-important-details)
        - [definitions.global](#definitionsglobal)
  - [Important Details](#important-details)
    - [`definitions.project.properties`](#definitionsprojectproperties)
    - [`definitions.project.definitions`](#definitionsprojectdefinitions)
      - [i18n](#i18n)
      - [target](#target)
      - [cli](#cli)
      - [schematics](#schematics)
      - [prefix](#prefix)
      - [root](#root)
      - [i18n](#i18n-1)
      - [sourceRoot](#sourceroot)
      - [projectType](#projecttype)
      - [architect](#architect)
      - [target](#target-1)
  - [Main Structure of `angular.json`](#main-structure-of-angularjson)
    - [version](#version)
    - [cli](#cli-1)
      - [defaultCollection](#defaultcollection)
      - [packageManager](#packagemanager)
      - [warnings](#warnings)
        - [versionMismatch: true/false](#versionmismatch-truefalse)
      - [analytics: boolean/string](#analytics-booleanstring)
      - [analyticsSharing](#analyticssharing)
    - [schematics](#schematics-1)
    - [newProjectRoot](#newprojectroot)
    - [defaultProject](#defaultproject)
    - [projects](#projects)
  - [Projects](#projects-1)
    - [projectType](#projecttype-1)
    - [root](#root-1)
    - [sourceRoot](#sourceroot-1)
    - [prefix](#prefix-1)
    - [schematics](#schematics-2)
    - [architect](#architect-1)

<!-- /code_chunk_output -->

<!-- prettier-ignore-end -->

## JSON Angular Workspace Schema

### First Level - Overview

Based on JSON Angular Workspace Schema (at the time of writing):

```js
'$schema',
  '$id',
  'title',
  'type',
  'properties',
  'additionalProperties',
  'required',
  'definitions';
```

The following first-level properties have single line values:

```js
"$schema": "http://json-schema.org/draft-07/schema",
"$id": "ng-cli://config/schema.json",
"title": "Angular CLI Workspace Configuration",
"type": "object",
...
'additionalProperties': false,
 required: [ 'version' ]
```

The properties `properties` and `definitons` are little bit complicated.

#### $schema

```js
"$schema": "http://json-schema.org/draft-07/schema",
```

#### $id

```js
"$id": "ng-cli://config/schema.json",
```

#### title

```js
"title": "Angular CLI Workspace Configuration",
```

#### type

```js
"type": "object",
```

#### additionalProperties

```js
'additionalProperties': false,
```

#### required

```js
required: ['version'];
```

#### properties

```js
'$schema',
  'version',
  'cli',
  'schematics',
  'newProjectRoot',
  'defaultProject',
  'projects';
```

The following ones have single line values:

```js
  '$schema': { type: 'string' },
  'version': { '$ref': '#/definitions/fileVersion' },
  'cli': { '$ref': '#/definitions/cliOptions' },
  'schematics': { '$ref': '#/definitions/schematicOptions' },
  'newProjectRoot': { type: 'string' },
  'defaultProject': { type: 'string' },
```

##### properties.$schema

```js
'$schema': { type: 'string' },
```

##### properties.version

```js
'version': { '$ref': '#/definitions/fileVersion' },
```

##### properties.cli

```js
'cli': { '$ref': '#/definitions/cliOptions' },
```

##### properties.schematics

```js
'schematics': { '$ref': '#/definitions/schematicOptions' },
```

##### properties.newProjectRoot

```js
'newProjectRoot': { type: 'string' },
```

##### properties.defaultProject

```js
'defaultProject': { type: 'string' },
```

##### properties.projects

And the `projects` has a reference to definitions:

```js
  'projects'
    type: 'object'
    patternProperties:
      '$ref': '#/definitions/project'
```

#### definitions

<!-- prettier-ignore-start -->
```js
'cliOptions', 
'schematicOptions', 
'fileVersion', 
'project', 
'global';
```
<!-- prettier-ignore-end -->

Each of them (except `fileVersion`) has a complicated structure.

The easiest one is `fileVersion`:

```js
'fileVersion': type: 'integer', minimum: 1,
```

##### definitions.cliOptions

```js
'cliOptions',
  defaultCollection:
  packageManager:
  warnings:
  analytics:
  analyticsSharing:
    tracking:
    uuid:
```

##### definitions.schematicOptions

The paths are simplified for reasons of clarity:

```js
'schematicOptions', -> @schematics/angular:
  'application': -> '$ref': '.../application/schema.json'
  'class': -> '$ref': '.../class/schema.json'
  'component': -> '$ref': '.../component/schema.json'
  'directive': -> '$ref': '.../directive/schema.json'
  'enum': -> '$ref': '.../enum/schema.json'
  'guard': -> '$ref': '.../guard/schema.json'
  'interceptor': -> '$ref': '.../interceptor/schema.json'
  'interface': -> '$ref': '.../interface/schema.json'
  'library': -> '$ref': '.../library/schema.json'
  'pipe': -> '$ref': '.../pipe/schema.json'
  'ng-new': -> '$ref': '.../ng-new/schema.json'
  'resolver': -> '$ref': '.../resolver/schema.json'
  'service': -> '$ref': '.../service/schema.json'
  'web-worker': -> '$ref': '.../web-worker/schema.json
```

##### definitions.fileVersion

```js
'fileVersion': type: 'integer', minimum: 1,
```

##### definitions.project

```js
'type',
  'properties',
  'required',
  'anyOf',
  'additionalProperties',
  'patternProperties',
  'definitions';
```

###### definitions.project.type

```js
type: string;
```

###### definitions.project.properties -> Important Details

See section below -> `Important Details`

###### definitions.project.required

```js
['root', 'projectType'];
```

###### definitions.project.anyOf

```js
 { required: [ 'architect' ], not: { required: [ 'targets' ] } },
 { required: [ 'targets' ], not: { required: [ 'architect' ] } },
 { not: { required: [ 'targets', 'architect' ] } }
```

###### definitions.project.additionalProperties

```js
additionalProperties: false,
```

###### definitions.project.patternProperties

```js
patternProperties: {
      '^[a-z]{1,3}-.*': {},
    },
```

###### definitions.project.definitions -> Important Details

See section below -> `Important Details`

##### definitions.global

```js
  'global'
    '$schema': { type: 'string', format: 'uri' }
    'version': { '$ref': '#/definitions/fileVersion' }
    'cli': { '$ref': '#/definitions/cliOptions' },
    'schematics': { '$ref': '#/definitions/schematicOptions' }
```

## Important Details

### `definitions.project.properties`

```js
'cli',
  'schematics',
  'prefix',
  'root',
  'i18n',
  'sourceRoot',
  'projectType',
  'architect',
  'targets';
```

### `definitions.project.definitions`

<!-- prettier-ignore-start -->
```js
[ 
'i18n', 
'target' 
]
```
<!-- prettier-ignore-end -->

#### i18n

#### target

#### cli

#### schematics

#### prefix

#### root

#### i18n

#### sourceRoot

#### projectType

#### architect

#### target

## Main Structure of `angular.json`

### version

The configuration-file version.

### cli

#### defaultCollection

Example: `"defaultCollection": "@nrwl/angular"`,

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

### newProjectRoot

Path where new projects are created. Absolute or relative to the workspace folder.

### defaultProject

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

## Projects

These are the all available project-properties (re-check) at time of writing (fished out from source files):

- 'projectType', &#10004;
- 'root', &#10004;
- 'sourceRoot', &#10004;
- 'prefix', &#10004;
- 'schematics', &#10004;
- 'architect', &#10004;

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
