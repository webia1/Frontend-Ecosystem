# Angular Enterprise Setup

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Preconditions](#preconditions)
- [Steps](#steps)
  - [Create Nx workspace](#create-nx-workspace)
  - [Create a new Angular application](#create-a-new-angular-application)
  - [Install Angular Material](#install-angular-material)
  - [Choose your Store Management](#choose-your-store-management)
    - [NGRX](#ngrx)
      - [Install NGRX Related Packages](#install-ngrx-related-packages)
    - [NGXS](#ngxs)
      - [Install NGXS Related Packages](#install-ngxs-related-packages)
  - [Install Formly](#install-formly)
  - [Install Translate](#install-translate)
  - [Install Prettier](#install-prettier)
  - [Install ESLint](#install-eslint)
  - [Install Jest](#install-jest)
  - [Install Cypress](#install-cypress)
  - [Install Storybook](#install-storybook)

<!-- /code_chunk_output -->

This document describes how to setup an Angular project for enterprise use. It is based on the Nx workspace and the Angular CLI.

## Preconditions

- Git installed
- GitHub account
- Node.js and npm installed
- VSCode installed
- Yarn installed
  `npm i -g yarn`
- Angular CLI installed
  `ng i -g @angular/cli`
- Nrwl & Nx CLI installed
  'ng i -g @nrwl/cli'
  `ng i -g nx`
  `ng i -g @nrwl/schematics`
  `yarn add @nrwl/angular`

## Steps

### Create Nx workspace

- Create a new Nx workspace
  `npx create-nx-workspace@latest`
- Select Angular as application framework
- Select Nx CLI as CLI
- Select yarn as package manager

### Create a new Angular application

- Create a new Angular application

  `ng g @nrwl/angular:application --name=app --style=scss --routing=true --prefix=app --linter=eslint`

- Add the following dependencies to the package.json

  TBD: Add dependencies

  ```json

  ```

### Install Angular Material

- Install Angular Material

  `ng add @angular/material`

### Choose your Store Management

#### NGRX

`ng add @ngrx/store`

##### Install NGRX Related Packages

```shell
yarn add @ngrx/effects
yarn add @ngrx/entity
yarn add @ngrx/router-store
yarn add @ngrx/store-devtools
```

#### NGXS

`ng add @ngxs/store`

##### Install NGXS Related Packages

```shell
yarn add @ngx-formly/core
yarn add @ngx-formly/material
yarn add @ngx-formly/schematics
yarn add @ngx-translate/core
yarn add @ngx-translate/http-loader
yarn add @ngxs-labs/dispatch-decorator
yarn add @ngxs-labs/immer-adapter
yarn add @ngxs-labs/select-snapshot
yarn add @ngxs/devtools-plugin
yarn add @ngxs/form-plugin
yarn add @ngxs/router-plugin
yarn add @ngxs/storage-plugin
yarn add @ngxs/store

```

### Install Formly

`ng add @ngx-formly/schematics`

### Install Translate

`ng add @ngx-translate/core`

### Install Prettier

`ng add @nrwl/workspace`

### Install ESLint

`ng add @nrwl/eslint`

### Install Jest

`ng add @nrwl/jest`

### Install Cypress

`ng add @nrwl/cypress`

### Install Storybook

`ng add @nrwl/storybook`
