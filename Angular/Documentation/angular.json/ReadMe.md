# Nx generated "angular.json"

> Last Update: September 2021
> Similar Content: <https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/>

<!-- prettier-ignore-start -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx generated "angular.json"](#nx-generated-angularjson)
  - [JSON Angular Workspace Schema](#json-angular-workspace-schema)
  - [Main Structure of `angular.json`](#main-structure-of-angularjson)
    - [version](#version)
    - [cli](#cli)
      - [defaultCollection](#defaultcollection)
      - [packageManager](#packagemanager)
      - [warnings](#warnings)
        - [versionMismatch: true/false](#versionmismatch-truefalse)
      - [analytics: boolean/string](#analytics-booleanstring)
      - [analyticsSharing](#analyticssharing)
    - [schematics](#schematics)
    - [newProjectRoot](#newprojectroot)
    - [defaultProject](#defaultproject)
    - [projects](#projects)
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
  '$schema': { type: 'string' },
  'version': { '$ref': '#/definitions/fileVersion' },
  'cli': { '$ref': '#/definitions/cliOptions' },
  'schematics': { '$ref': '#/definitions/schematicOptions' },
  'newProjectRoot': { type: 'string' },
  'defaultProject': { type: 'string' },
  'projects'
    type: 'object'
    patternProperties:
      '$ref': '#/definitions/project'

'additionalProperties': false,
 required: [ 'version' ]
'definitions':
  'cliOptions',
    defaultCollection:
    packageManager:
    warnings:
    analytics:
    analyticsSharing:
      tracking:
      uuid:
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
  'fileVersion': type: 'integer', minimum: 1,
  'project',
    properties:
      'prefix': type: 'string',
      'root': type: 'string',
      'i18n': '$ref': '#/definitions/project/definitions/i18n',
      'sourceRoot': type: 'string',
      'projectType': type: 'string', enum: [ 'application', 'library' ],
      'architect': type: 'object',
        type: 'object',
        additionalProperties: { '$ref': '#/definitions/project/definitions/target' }
          type: object
          properties: oneOf
            0:
              '$comment': 'Extendable target with custom builder',
              type: 'object',
              properties:
                'builder',
                  type: string
                  description: The builder used for this package.
                  not:
                    enum:
                      '@angular-devkit/build-angular:app-shell',
                      '@angular-devkit/build-angular:browser',
                      '@angular-devkit/build-angular:dev-server',
                      '@angular-devkit/build-angular:extract-i18n',
                      '@angular-devkit/build-angular:karma',
                      '@angular-devkit/build-angular:protractor',
                      '@angular-devkit/build-angular:server',
                      '@angular-devkit/build-angular:ng-packagr'
                'defaultConfiguration',
                  type: 'string',
                  description: 'A default named configuration to use when a target configuration is not provided.'
                'options',
                'configurations

      'targets': type: 'object'
    required: [ 'root', 'projectType' ],
    anyOf:
      { required: [ 'architect' ], not: { required: [ 'targets' ] } },
      { required: [ 'targets' ], not: { required: [ 'architect' ] } },
      { not: { required: [ 'targets', 'architect' ] } }
    definitions: [ 'i18n', 'target' ]
      i18n:
        type: object
        properties:
          sourceLocale:
            oneOf:
              0:
                '$comment': 'IETF BCP 47 language tag (simplified)'
                'type': 'string',
                'default': 'en-US',
              1:
                type: 'object',
                description: 'Localization options to use for the source locale',
                properties:
                  code:
                    type: string,
                    description: 'Specifies the locale code of the source locale',
                    pattern: '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$' },
                  baseHref:
                    type: string,
                    description: 'HTML base HREF to use for the locale (defaults to the locale code)' } },
          locales:
            type: object
            patternProperties:
              oneOf
                0:
                  type: string
                1:
                  type: array
                  items: { type: 'string', uniqueItems: true }
                2:
                  type: object
                  properties:
                    translation: oneOf
                      0: type: 'string'
                      1: type: 'array'
                        items: items: { type: 'string', uniqueItems: true }
                    baseHref: string

  'global'
    '$schema': { type: 'string', format: 'uri' }
    'version': { '$ref': '#/definitions/fileVersion' }
    'cli': { '$ref': '#/definitions/cliOptions' },
    'schematics': { '$ref': '#/definitions/schematicOptions' }

```

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
