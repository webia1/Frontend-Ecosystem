# NPM/Node

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NPM/Node](#npmnode)
  - [Node](#node)
    - [Using Environment Variables](#using-environment-variables)
      - [Within Scripts and Shell Commands](#within-scripts-and-shell-commands)
      - [With '.env' File](#with-env-file)
  - [NPM](#npm)
    - [Skip SSL Checks](#skip-ssl-checks)
    - [Build From Resource (Some gyp & co related errors)](#build-from-resource-some-gyp-co-related-errors)
    - [Where does npm install packages?](#where-does-npm-install-packages)
    - [Show globally installed packages](#show-globally-installed-packages)
    - [Installing directly from github](#installing-directly-from-github)
    - [Passing Parameters](#passing-parameters)
      - [From Commandline](#from-commandline)
      - [Between NPM Scripts](#between-npm-scripts)
        - [First approach (static value)](#first-approach-static-value)
        - [Second Approach (value over commandline + like above)](#second-approach-value-over-commandline-like-above)
      - [Reusing Configuration Variables within package.json](#reusing-configuration-variables-within-packagejson)
  - [Trouble Shooting](#trouble-shooting)
    - [Brew node / npm Problem: Error: Cannot find module ‘semver’](#brew-node-npm-problem-error-cannot-find-module-semver)

<!-- /code_chunk_output -->

## Node

### Using Environment Variables

#### Within Scripts and Shell Commands

```shell
process.env.EXAMPLE_URI; // e.g. within index.js
```

```
EXAMPLE_URI=mongodb://localhost:27107/foo node index.js
```

#### With '.env' File

```shell
yarn add dotenv
touch .env
vi .env // add EXAMPLE_URI=mongodb://localhost:27107/foo
```

```js
require('dotenv').config(); // e.g. within index.js
```

```
node index.js
```

## NPM

### Skip SSL Checks

    Use --insecure flag

### Build From Resource (Some gyp & co related errors)

    npm install --build-from-resource

### Where does npm install packages?

`npm root [-g]`

### Show globally installed packages

`npm list -g --depth=0`

### Installing directly from github

`npm install https://github.com/repo/npm_module.git --save`

### Passing Parameters

#### From Commandline

See ALL DETAILS here: https://docs.npmjs.com/misc/scripts

For professional use-cases use: https://github.com/yargs/ For all other just:

Commandline: `npm run args --myParam=Hello`

    // Windows
    "args": "echo \"The value of --myParam is '%npm_config_myParam%'\""
    // Linux
    "args": "echo \"The value of --myParam is '${npm_config_myParam}'\""

#### Between NPM Scripts

##### First approach (static value)

Notice `--` here:

```json
"scripts": {
    "start": "ts-node src/server.ts",
    "start:differentPort": "npm start -- 4000",
    "start:somethingElse": "npm start -- ${npm_package_config_port}"
},
"config": {
    "port" : "3000"
}
```

##### Second Approach (value over commandline + like above)

Run with: `npm run i1 --dockerVersion="1.2.3"`

```json
  "scripts": {
    "docker:tag": "docker tag",
    "i1": "npm run docker:tag -- ${npm_package_config_i1_name}:${npm_package_config_i1_version} ${npm_package_config_i1_name}:${npm_config_dockerVersion}"
  },
  "config": {
    "i1": {
      "name": "my-image",
      "version": "latest"
    }
  },
```

#### Reusing Configuration Variables within package.json

On Windows: `%npm_package_config_port%` instead of `$npm_package_config_port`

```json
"scripts": {
    "start": "ts-node src/server.ts $npm_package_config_port"
},
"config": {
    "port" : "3000"
}
```

## Trouble Shooting

### Brew node / npm Problem: Error: Cannot find module ‘semver’

    sudo rm -rf /usr/local/lib/node_modules
    sudo rm -rf ~/.npm
    brew uninstall –force node
    brew install node
