# Nx Additional Libraries

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx Additional Libraries](#nx-additional-libraries)
  - [Standard Libraries](#standard-libraries)
  - [Additional Libraries](#additional-libraries)
    - [Frontend/Middleware/UI (Angular/NestJS/..)](#frontendmiddlewareui-angularnestjs)
      - [Use HTML Snippets in OpenAPI Method Descriptions](#use-html-snippets-in-openapi-method-descriptions)
        - [html.d.ts](#htmldts)
        - [tsconfig.json](#tsconfigjson)
        - [tsconfig.app.json & tsconfig.spec.json](#tsconfigappjson--tsconfigspecjson)
        - [webpack.config.ts](#webpackconfigts)

<!-- /code_chunk_output -->

## Standard Libraries

They will be installed automatically when you create a new App.

## Additional Libraries

### Frontend/Middleware/UI (Angular/NestJS/..)

```shell
# Angular
npm i -S @angular/cdk @angular/material @auth0/angular-jwt

# NestJS Dependencies
npm i -S @nestjs/common @nestjs/core
npm i -S @nestjs/jwt @nestjs/passport @nestjs/typeorm
npm i -S @nestjs/swagger cookie-parser express-session
npm i -S @nestjs/mongoose  @nestjs/platform-express
npm i -S bcrypt bcryptjs passport passport-jwt @nestjs/jwt
npm i -S colorette
npm i -S jsonwebtoken
npm i -S material-icons
npm i -S ngx-cookie-service ngx-toastr
npm i -S pg postgres typeorm
npm i -S @ngx-translate/core @ngx-translate/http-loader
# NestJS DevDependencies
npm i -D @nestjs/devtools-integration
npm i -D @nestjs/testing
npm i -D @nestjs/schematics
npm i -D @nestjs/mapped-types
npm i -D @types/bcrypt
npm i -D @types/passport
npm i -D cross-env # for cross environment variables
npm i -D ts-morph chroma-js # for generators
npm i -D ts-loader # Import HTML for OpenAPI Method Descriptions
npm i -D html-loader # Import HTML for OpenAPI Method Descriptions
```

#### Use HTML Snippets in OpenAPI Method Descriptions

##### html.d.ts

```ts
// html.d.ts
declare module '*.html' {
  const value: string;
  export default value;
}
```

##### tsconfig.json

```shell
npm i -D ts-loader
```

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-plugin-html",
        "tags": ["html"]
      }
    ]
  }
}
```

##### tsconfig.app.json & tsconfig.spec.json

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "module": "commonjs",
    "outDir": "../../../dist/out-tsc",
    "target": "es2021"
  },
  "exclude": ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"],
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "html.d.ts"]
}
```

##### webpack.config.ts

```ts
// webpack.config.ts
import { composePlugins, withNx } from '@nx/webpack';

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  config.module = {
    rules: [
      { test: /\.ts$/, use: [{ loader: require.resolve('ts-loader') }] },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve('html-loader'),
            options: { minimize: true, esModule: false },
          },
        ],
      },
    ],
  };
  return config;
});
```
