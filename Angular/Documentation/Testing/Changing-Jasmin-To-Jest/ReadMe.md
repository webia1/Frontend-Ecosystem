# Changing to Jest - Angular 11+

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Simple Method to Change](#simple-method-to-change)
   1. [For an Existing Project](#for-an-existing-project)
   2. [Optionally: Install Globally](#optionally-install-globally)
2. [Issues](#issues)
3. [Explanation of Modifications](#explanation-of-modifications)
   1. [`angular.json` will be modified](#angularjson-will-be-modified)
   2. [`jest.config.ts` will be created](#jestconfigts-will-be-created)
   3. [`karma.conf.js` will be deleted](#karmaconfjs-will-be-deleted)
   4. [`setup-jest.ts` will be created](#setup-jestts-will-be-created)
   5. [`test-config.helper.ts` will be created](#test-confighelperts-will-be-created)
   6. [`tsconfig.spec.json` will be modified](#tsconfigspecjson-will-be-modified)
   7. [`test.js` will be deleted](#testjs-will-be-deleted)

<!-- /code_chunk_output -->

## Simple Method to Change

### For an Existing Project

To replace Karma/Jasmine with Jest, just use:

```shell
ng add @briebug/jest-schematic
```

### Optionally: Install Globally

```shell
npm install -g @briebug/jest-schematic
```

Then in an Angular CLI project run

```shell
ng g @briebug/jest-schematic:add
```

## Issues

> Excerpt from: https://github.com/briebug/jest-schematic

If you're experiencing issues when trying to run your tests with Jest, please view the documentation for the [builder](https://github.com/just-jeb/angular-builders/tree/master/packages/jest) which uses [jest-preset-angular](https://github.com/thymikee/jest-preset-angular#troubleshooting).

A common issues involves library dependencies. For example if your app depends on NgRx you'll need to tell Jest to compile the sources [explicitly](https://github.com/thymikee/jest-preset-angular#adjust-your-transformignorepatterns-whitelist) by appending it to the transformIgnorePatterns property in the jest.config.js file.

```js
module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ngrx))'],
};
```

Issues with this schematic can be filed [here](https://github.com/briebug/jest-schematic/issues/new/choose).

## Explanation of Modifications

### `angular.json` will be modified

```diff
"test": {
- "builder": "@angular-devkit/build-angular:karma",
+ "builder": "@angular-builders/jest:run",
  "options": {
-   "main": "src/test.ts",
    "polyfills": "src/polyfills.ts",
    "tsConfig": "tsconfig.spec.json",
-   "karmaConfig": "karma.conf.js",
    "assets": [
      "src/favicon.ico",
      "src/assets"
    ],
    "styles": [
      "src/styles.scss"
    ],
    "scripts": []
  }
},
```

### `jest.config.ts` will be created

```typescript
module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
```

### `karma.conf.js` will be deleted

### `setup-jest.ts` will be created

```typescript
import 'jest-preset-angular';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) =>
      (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
```

### `test-config.helper.ts` will be created

```typescript
import { TestBed } from '@angular/core/testing';

type CompilerOptions = Partial<{
  providers: any[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;
export type ConfigureFn = (testBed: typeof TestBed) => void;

export const configureTests = (
  configure: ConfigureFn,
  compilerOptions: CompilerOptions = {},
) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions,
  };

  const configuredTestBed = TestBed.configureCompiler(compilerConfig);

  configure(configuredTestBed);

  return configuredTestBed
    .compileComponents()
    .then(() => configuredTestBed);
};
```

### `tsconfig.spec.json` will be modified

To learn more about this file see: <https://angular.io/config/tsconfig>.

```diff
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
-     "jasmine"
+     "jest"
    ]
+   "module": "commonjs",
+   "emitDecoratorMetadata": true,
+   "allowJs": true
  },
  "files": [
-   "src/test.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

### `test.js` will be deleted
