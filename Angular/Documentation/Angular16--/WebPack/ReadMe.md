# Configure WebPack for Angular Apps

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Current Configuration Analysis](#-current-configuration-analysis)
- [1) `ng eject`](#-1-ng-eject)
- [2) Custom Builder](#-2-custom-builder)
- [3) @angular-builders/custom-webpack](#-3-angular-builderscustom-webpack)

<!-- /code_chunk_output -->

## Current Configuration Analysis

You can see the Webpack configuration used by the Angular CLI without ejecting it by using the `ng build --prod --stats-json` or `ng serve --prod --stats-json` command. The `--prod` option builds the application in production mode, and the `--stats-json` option outputs a JSON file that contains the Webpack build stats.

The Webpack build stats file contains information about the build process, including the Webpack configuration used by the Angular CLI. You can use a tool like webpack-bundle-analyzer to visualize the stats file and see the Webpack configuration in a graphical format.

Here's an example of how you can use the `ng build --prod --stats-json` command:

```shell
ng build --prod --stats-json
```

This will create a JSON file in the dist/ directory, named stats.json. You can then use the webpack-bundle-analyzer to visualize the stats file by running the following command:

```shell
npx webpack-bundle-analyzer dist/stats.json
```

This will open a web page that shows the Webpack configuration used by the Angular CLI, including information about the entry points, chunks, modules, and assets. You can use this information to understand the Webpack configuration used by the Angular CLI and make informed decisions about your own customizations.

## 1) `ng eject`

To overwrite the Webpack configuration in an Angular application, you can use the `ng eject` command to generate the webpack config files. This command is available in Angular CLI 6 and later.

After running the `ng eject` command, the webpack configuration files will be present in the `angular.json` file. You can modify these configuration files to fit your needs.

Note: Be careful when modifying the webpack config files, as changes may break the build process or cause other unexpected issues. It's always a good idea to make a backup of the original configuration before making changes.

## 2) Custom Builder

You can create a custom builder in the `angular.json` file, which allows you to extend or override the default build process.

Here's an example of how you can create a custom builder in the `angular.json` file:

```json
{
  ...
  "projects": {
    "<your-project-name>": {
      ...
      "architect": {
        "build": {
          ...
        },
        "custom": {
          "builder": "./path/to/your/builder",
          "options": {
            ...
          }
        }
      }
    }
  }
}

```

You can then run the custom builder using the `ng run <your-project-name>:custom` command, and it will use the custom webpack configuration defined in the `./path/to/your/builder` file.

This allows you to overwrite the webpack configuration without using the `ng eject` command, while still keeping the ability to use the Angular CLI to build and manage your project.

The `./path/to/your/builder` file is a custom builder script that you can use to extend or overwrite the default Webpack configuration.

Here's an example of a custom builder script:

```ts
const webpack = require('webpack');

module.exports = function (config, options) {
  // Extend or overwrite the default Webpack configuration
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  );

  // Return the modified Webpack configuration
  return config;
};
```

This custom builder script adds a new plugin to the Webpack configuration, which sets the `NODE_ENV` environment variable to `'production'`. You can modify the script to fit your specific needs, such as adding additional plugins, modifying loaders, or changing the output configuration.

Note that the script must export a function that takes two arguments, `config` and `options`, and returns the modified Webpack configuration. The `config` argument is the default Webpack configuration generated by the Angular CLI, and the `options` argument is an object containing the options defined in the `angular.json` file.

## 3) @angular-builders/custom-webpack

Using `@angular-builders/custom-webpack` is a good choice if you need to customize the Webpack configuration in an Angular application. `@angular-builders/custom-webpack` is a builder for the Angular CLI that provides a simple and efficient way to customize the Webpack configuration without ejecting from the Angular CLI.

With `@angular-builders/custom-webpack`, you can extend or overwrite the default Webpack configuration by defining a custom configuration file. The custom configuration file can be a `webpack.config.js` file, or any other file that exports a valid Webpack configuration.

Here's an example of how you can use `@angular-builders/custom-webpack` in your Angular application:

- Install `@angular-builders/custom-webpack` as a development dependency:
  `npm install @angular-builders/custom-webpack --save-dev`

- Update the `angular.json` file to use the custom builder:

```json
{
  ...
  "projects": {
    "<your-project-name>": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./path/to/your/webpack.config.js"
            },
            ...
          }
        }
      }
    }
  }
}
```

- Create the custom Webpack configuration file, `./path/to/your/webpack.config.js`, which exports a valid Webpack configuration.

- Build or serve your application as you normally would, using the `ng build` or `ng serve` command. The Angular CLI will use the custom Webpack configuration defined in the `./path/to/your/webpack.config.js` file.

`@angular-builders/custom-webpack` provides a simple and efficient way to extend or overwrite the default Webpack configuration without ejecting from the Angular CLI. This makes it easier to maintain and upgrade your application in the future. Additionally, `@angular-builders/custom-webpack` is widely used and well-supported by the Angular community, making it a reliable choice for customizing the Webpack configuration in an Angular application.
