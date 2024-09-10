# Nx

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting Started](#getting-started)

<!-- /code_chunk_output -->

## Getting Started

```shell
# Install Nx CLI
npm i -g nx@latest

# Create a new workspace
npx create-nx-workspace@latest my-workspace --preset=empty --cli=nx

# Install packages you need (See online)
# E.g. Angular/Nest/..
npm i -D @nx/angular
npm i -D @nx/nest
```

Choose from the list (See online):

```plaintext
@nx/devkit            @nx/esbuild           @nx/eslint            @nx/eslint-plugin
@nx/jest              @nx/js                @nx/linter            @nx/nest
@nx/node              @nx/playwright        @nx/plugin            @nx/react
@nx/react-native      @nx/storybook         @nx/web               @nx/webpack
@nx/workspace
```

**Recommended:**

```shell
npm i -D @nx/eslint @nx/eslint-plugin @nx/linter
npm i -D @nx/node @nx/web
npm i -D @nx/jest @nx/playwright @nx/storybook
```

When you want to **add a project**, better use VSCode Nx Console. Create a new directory `apps` and click with the right mouse button on it. Choose `Nx: Generate (UI)` and see the list of available schematics.

Install other packages you need via the terminal. Differentiate between `dependencies` and `devDependencies`.

**Dev Dependencies:**

Important: If you copy `.eslintrc.json` and `.prettierrc.json` etc. from other projects, you may need remove old incompatible package configurations and install new ones.

```shell
# Important for Angular & ESLint
npm i -D @angular-eslint/eslint-plugin
npm i -D @angular-eslint/eslint-plugin-template
npm i -D @angular-eslint/template-parser
npm i -D eslint prettier eslint-config-prettier @typescript-eslint

# Important for Formly
npm i -D @ngx-formly/schematics
```

**Dependencies e.g.:**

```shell
npm i -S @ngx-formly/core @ngx-formly/material
npm i -S @angular/material @angular/cdk
npm i -S @angular/animations
npm i -S angular-three
```

**Initialisation** of a new project (e.g. Angular-Three):

```shell
npx nx g angular-three:init
```
