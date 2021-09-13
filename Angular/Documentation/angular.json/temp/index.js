let a = {
  version: 1,
  projects: {
    edvs: {
      projectType: 'application',
      schematics: {
        '@schematics/angular:component': {
          style: 'scss',
        },
      },
      root: 'apps/edvs',
      sourceRoot: 'apps/edvs/src',
      prefix: 'dvs',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            allowedCommonJsDependencies: [
              'moment-es6',
              '@oblique/oblique',
            ],
            outputPath: 'dist/apps/edvs/www',
            index: 'apps/edvs/src/index.html',
            main: 'apps/edvs/src/main.ts',
            polyfills: 'apps/edvs/src/polyfills.ts',
            tsConfig: 'apps/edvs/tsconfig.app.json',
            assets: [
              'apps/edvs/src/favicon.ico',
              'apps/edvs/src/assets',
              'apps/edvs/src/build-info.json',
              'apps/edvs/src/app-config.json',
              {
                glob: '**/*',
                input: 'node_modules/@oblique/oblique/styles/fonts',
                output: 'assets/fonts/',
              },
              {
                glob: '**/*',
                input: 'node_modules/@oblique/oblique/assets/',
                output: 'assets/',
              },
            ],
            styles: [
              'apps/edvs/src/styles/global.scss',
              'node_modules/@oblique/oblique/styles/scss/oblique-core.scss',
              'node_modules/@oblique/oblique/styles/css/oblique-material.css',
            ],
            stylePreprocessorOptions: {
              includePaths: [
                'apps/edvs/src/styles',
                'libs/common-styles/src/styles',
              ],
            },
            scripts: ['node_modules/@oblique/oblique/ob-features.js'],
          },
          configurations: {
            hmr: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.hmr.ts',
                },
              ],
              optimization: false,
              outputHashing: 'none',
              sourceMap: true,
              namedChunks: true,
              extractLicenses: false,
              vendorChunk: false,
              buildOptimizer: false,
            },
            production: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.production.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            DEV: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.DEV.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            TEST: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.TEST.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            REF: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.REF.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            ABN: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.ABN.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            PROD: {
              fileReplacements: [
                {
                  replace:
                    'apps/edvs/src/environments/environment.ts',
                  with: 'apps/edvs/src/environments/environment.PROD.ts',
                },
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb',
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb',
                },
              ],
            },
            LOCAL: {
              optimization: false,
              vendorChunk: true,
              sourceMap: true,
              namedChunks: true,
            },
          },
          outputs: ['{options.outputPath}'],
          defaultConfiguration: 'LOCAL',
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          options: {
            browserTarget: 'edvs:build',
            port: 4330,
            host: '0.0.0.0',
            allowedHosts: ['localdev.com', 'localhost'],
            proxyConfig: 'apps/edvs/proxy.conf.json',
          },
          configurations: {
            hmr: {
              hmr: true,
              browserTarget: 'edvs:build:hmr',
            },
            production: {
              browserTarget: 'edvs:build:production',
            },
          },
        },
        'extract-i18n': {
          builder: '@angular-devkit/build-angular:extract-i18n',
          options: {
            browserTarget: 'edvs:build',
          },
        },
        lint: {
          builder: '@nrwl/linter:eslint',
          options: {
            lintFilePatterns: [
              'apps/edvs/src/main.ts',
              'apps/edvs/src/polyfills.ts',
              'apps/edvs/**/*.spec.ts',
              'apps/edvs/**/*.d.ts',
              'apps/edvs/src/test-setup.ts',
            ],
          },
        },
        test: {
          builder: '@nrwl/jest:jest',
          options: {
            jestConfig: 'apps/edvs/jest.config.js',
            passWithNoTests: true,
          },
          outputs: ['coverage/apps/edvs'],
        },
      },
    },
  },
  cli: {
    defaultCollection: '@nrwl/angular',
  },
  schematics: {
    '@nrwl/workspace': {
      library: {
        linter: 'tslint',
      },
    },
    '@nrwl/cypress': {
      'cypress-project': {
        linter: 'tslint',
      },
    },
    '@nrwl/node': {
      application: {
        linter: 'tslint',
      },
      library: {
        linter: 'tslint',
      },
    },
    '@nrwl/nest': {
      application: {
        linter: 'tslint',
      },
      library: {
        linter: 'tslint',
      },
    },
    '@nrwl/express': {
      application: {
        linter: 'tslint',
      },
      library: {
        linter: 'tslint',
      },
    },
    '@nrwl/angular:application': {
      style: 'scss',
      linter: 'eslint',
      unitTestRunner: 'jest',
      e2eTestRunner: 'cypress',
    },
    '@nrwl/angular:library': {
      style: 'scss',
      linter: 'eslint',
      unitTestRunner: 'jest',
      strict: true,
    },
    '@nrwl/angular:component': {
      style: 'scss',
    },
  },
  defaultProject: 'edvs',
};

let s = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'ng-cli://config/schema.json',
  title: 'Angular CLI Workspace Configuration',
  type: 'object',
  properties: {
    $schema: {
      type: 'string',
    },
    version: {
      $ref: '#/definitions/fileVersion',
    },
    cli: {
      $ref: '#/definitions/cliOptions',
    },
    schematics: {
      $ref: '#/definitions/schematicOptions',
    },
    newProjectRoot: {
      type: 'string',
      description: 'Path where new projects will be created.',
    },
    defaultProject: {
      type: 'string',
      description: 'Default project name used in commands.',
    },
    projects: {
      type: 'object',
      patternProperties: {
        '^(?:@[a-zA-Z0-9_-]+/)?[a-zA-Z0-9_-]+$': {
          $ref: '#/definitions/project',
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
  required: ['version'],
  definitions: {
    cliOptions: {
      type: 'object',
      properties: {
        defaultCollection: {
          description: 'The default schematics collection to use.',
          type: 'string',
        },
        packageManager: {
          description: 'Specify which package manager tool to use.',
          type: 'string',
          enum: ['npm', 'cnpm', 'yarn', 'pnpm'],
        },
        warnings: {
          description: 'Control CLI specific console warnings',
          type: 'object',
          properties: {
            versionMismatch: {
              description:
                'Show a warning when the global version is newer than the local one.',
              type: 'boolean',
            },
          },
        },
        analytics: {
          type: ['boolean', 'string'],
          description:
            'Share anonymous usage data with the Angular Team at Google.',
        },
        analyticsSharing: {
          type: 'object',
          properties: {
            tracking: {
              description: 'Analytics sharing info tracking ID.',
              type: 'string',
              pattern: '^GA-\\d+-\\d+$',
            },
            uuid: {
              description:
                'Analytics sharing info universally unique identifier.',
              type: 'string',
            },
          },
        },
      },
      additionalProperties: false,
    },
    schematicOptions: {
      type: 'object',
      properties: {
        '@schematics/angular:application': {
          $ref: '../../../../schematics/angular/application/schema.json',
        },
        '@schematics/angular:class': {
          $ref: '../../../../schematics/angular/class/schema.json',
        },
        '@schematics/angular:component': {
          $ref: '../../../../schematics/angular/component/schema.json',
        },
        '@schematics/angular:directive': {
          $ref: '../../../../schematics/angular/directive/schema.json',
        },
        '@schematics/angular:enum': {
          $ref: '../../../../schematics/angular/enum/schema.json',
        },
        '@schematics/angular:guard': {
          $ref: '../../../../schematics/angular/guard/schema.json',
        },
        '@schematics/angular:interceptor': {
          $ref: '../../../../schematics/angular/interceptor/schema.json',
        },
        '@schematics/angular:interface': {
          $ref: '../../../../schematics/angular/interface/schema.json',
        },
        '@schematics/angular:library': {
          $ref: '../../../../schematics/angular/library/schema.json',
        },
        '@schematics/angular:pipe': {
          $ref: '../../../../schematics/angular/pipe/schema.json',
        },
        '@schematics/angular:ng-new': {
          $ref: '../../../../schematics/angular/ng-new/schema.json',
        },
        '@schematics/angular:resolver': {
          $ref: '../../../../schematics/angular/resolver/schema.json',
        },
        '@schematics/angular:service': {
          $ref: '../../../../schematics/angular/service/schema.json',
        },
        '@schematics/angular:web-worker': {
          $ref: '../../../../schematics/angular/web-worker/schema.json',
        },
      },
      additionalProperties: {
        type: 'object',
      },
    },
    fileVersion: {
      type: 'integer',
      description: 'File format version',
      minimum: 1,
    },
    project: {
      type: 'object',
      properties: {
        cli: {
          $ref: '#/definitions/cliOptions',
        },
        schematics: {
          $ref: '#/definitions/schematicOptions',
        },
        prefix: {
          type: 'string',
          format: 'html-selector',
          description: 'The prefix to apply to generated selectors.',
        },
        root: {
          type: 'string',
          description: 'Root of the project files.',
        },
        i18n: {
          $ref: '#/definitions/project/definitions/i18n',
        },
        sourceRoot: {
          type: 'string',
          description:
            'The root of the source files, assets and index.html file structure.',
        },
        projectType: {
          type: 'string',
          description: 'Project type.',
          enum: ['application', 'library'],
        },
        architect: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/project/definitions/target',
          },
        },
        targets: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/project/definitions/target',
          },
        },
      },
      required: ['root', 'projectType'],
      anyOf: [
        {
          required: ['architect'],
          not: {
            required: ['targets'],
          },
        },
        {
          required: ['targets'],
          not: {
            required: ['architect'],
          },
        },
        {
          not: {
            required: ['targets', 'architect'],
          },
        },
      ],
      additionalProperties: false,
      patternProperties: {
        '^[a-z]{1,3}-.*': {},
      },
      definitions: {
        i18n: {
          description: 'Project i18n options',
          type: 'object',
          properties: {
            sourceLocale: {
              oneOf: [
                {
                  type: 'string',
                  description:
                    'Specifies the source locale of the application.',
                  default: 'en-US',
                  $comment: 'IETF BCP 47 language tag (simplified)',
                  pattern:
                    '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$',
                },
                {
                  type: 'object',
                  description:
                    'Localization options to use for the source locale',
                  properties: {
                    code: {
                      type: 'string',
                      description:
                        'Specifies the locale code of the source locale',
                      pattern:
                        '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$',
                    },
                    baseHref: {
                      type: 'string',
                      description:
                        'HTML base HREF to use for the locale (defaults to the locale code)',
                    },
                  },
                  additionalProperties: false,
                },
              ],
            },
            locales: {
              type: 'object',
              additionalProperties: false,
              patternProperties: {
                '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$':
                  {
                    oneOf: [
                      {
                        type: 'string',
                        description:
                          'Localization file to use for i18n',
                      },
                      {
                        type: 'array',
                        description:
                          'Localization files to use for i18n',
                        items: {
                          type: 'string',
                          uniqueItems: true,
                        },
                      },
                      {
                        type: 'object',
                        description:
                          'Localization options to use for the locale',
                        properties: {
                          translation: {
                            oneOf: [
                              {
                                type: 'string',
                                description:
                                  'Localization file to use for i18n',
                              },
                              {
                                type: 'array',
                                description:
                                  'Localization files to use for i18n',
                                items: {
                                  type: 'string',
                                  uniqueItems: true,
                                },
                              },
                            ],
                          },
                          baseHref: {
                            type: 'string',
                            description:
                              'HTML base HREF to use for the locale (defaults to the locale code)',
                          },
                        },
                        additionalProperties: false,
                      },
                    ],
                  },
              },
            },
          },
          additionalProperties: false,
        },
        target: {
          oneOf: [
            {
              $comment: 'Extendable target with custom builder',
              type: 'object',
              properties: {
                builder: {
                  type: 'string',
                  description: 'The builder used for this package.',
                  not: {
                    enum: [
                      '@angular-devkit/build-angular:app-shell',
                      '@angular-devkit/build-angular:browser',
                      '@angular-devkit/build-angular:dev-server',
                      '@angular-devkit/build-angular:extract-i18n',
                      '@angular-devkit/build-angular:karma',
                      '@angular-devkit/build-angular:protractor',
                      '@angular-devkit/build-angular:server',
                      '@angular-devkit/build-angular:ng-packagr',
                    ],
                  },
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  type: 'object',
                },
                configurations: {
                  type: 'object',
                  description: 'A map of alternative target options.',
                  additionalProperties: {
                    type: 'object',
                  },
                },
              },
              additionalProperties: false,
              required: ['builder'],
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:app-shell',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/app-shell/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/app-shell/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:browser',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/browser/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/browser/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:dev-server',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/dev-server/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/dev-server/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:extract-i18n',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/extract-i18n/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/extract-i18n/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:karma',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/karma/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/karma/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:protractor',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/protractor/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/protractor/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:server',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/server/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/server/schema.json',
                  },
                },
              },
            },
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                builder: {
                  const: '@angular-devkit/build-angular:ng-packagr',
                },
                defaultConfiguration: {
                  type: 'string',
                  description:
                    'A default named configuration to use when a target configuration is not provided.',
                },
                options: {
                  $ref: '../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json',
                },
                configurations: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json',
                  },
                },
              },
            },
          ],
        },
      },
    },
    global: {
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
          format: 'uri',
        },
        version: {
          $ref: '#/definitions/fileVersion',
        },
        cli: {
          $ref: '#/definitions/cliOptions',
        },
        schematics: {
          $ref: '#/definitions/schematicOptions',
        },
      },
      required: ['version'],
    },
  },
};

Object.values(a.projects.edvs.sourceRoot); //?
