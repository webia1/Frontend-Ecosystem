# NPM/Node

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NPM/Node](#npmnode)
  - [Node](#node)
    - [Install Mode](#install-mode)
    - [Install n Package Manager](#install-n-package-manager)
      - [Examples](#examples)
    - [Using Environment Variables](#using-environment-variables)
      - [Within Scripts and Shell Commands](#within-scripts-and-shell-commands)
      - [With '.env' File](#with-env-file)
  - [NPM](#npm)
    - [Skip SSL Checks](#skip-ssl-checks)
    - [Configs](#configs)
      - [Show Configuration](#show-configuration)
      - [Get User Config (.npmrc)](#get-user-config-npmrc)
      - [Where does npm install packages?](#where-does-npm-install-packages)
      - [Was wenn `.npmrc` nicht existiert?](#was-wenn-npmrc-nicht-existiert)
      - [Show globally installed packages](#show-globally-installed-packages)
    - [Passing Parameters](#passing-parameters)
      - [From Commandline](#from-commandline)
      - [Between NPM Scripts](#between-npm-scripts)
        - [First approach (static value)](#first-approach-static-value)
        - [Second Approach (value over commandline + like above)](#second-approach-value-over-commandline--like-above)
      - [Reusing Configuration Variables within package.json](#reusing-configuration-variables-within-packagejson)
  - [Trouble Shooting](#trouble-shooting)
    - [MacOS](#macos)
      - [Brew Unlink (npm shadowing)](#brew-unlink-npm-shadowing)
    - [Windows](#windows)
      - [Install Build Tools](#install-build-tools)
      - [Install Python 2.7](#install-python-27)
        - [Set python 2.7 Path](#set-python-27-path)
      - [Checks Build Tools & Python](#checks-build-tools--python)
    - [Build From Resource (Some gyp & co related errors)](#build-from-resource-some-gyp--co-related-errors)
      - [Installing directly from GitHub](#installing-directly-from-github)
    - [Brew node / npm Problem: Error: Cannot find module ‘semver’](#brew-node--npm-problem-error-cannot-find-module-semver)

<!-- /code_chunk_output -->

## Node

### Install Mode

Install Brew and then:

```shell
brew install node
```

### Install n Package Manager

```shell
npm i -g n
```

#### Examples

Run with sudo:

```shell
n latest         # Install the latest version
n lts            # Long Time Support
n prune          # Remove cached except current
n rm 0.9.4       # Remove v0.9.4
```

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

```js
node index.js
```

## NPM

### Skip SSL Checks

    Use --insecure flag

### Configs

#### Show Configuration

`npm config list -l`

#### Get User Config (.npmrc)

`npm config get userconfig` # shows the path to the user config file

#### Where does npm install packages?

`npm root [-g]`

#### Was wenn `.npmrc` nicht existiert?

`npm config get userconfig` zeigt den Pfad an. Wenn die Datei nicht existiert, dann einfach erstellen, in dem man beispielsweise einen Wert setzt, wie:

`npm config set registry https://registry.npmjs.org/`

#### Show globally installed packages

`npm list -g --depth=0`

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

### MacOS

#### Brew Unlink (npm shadowing)

Manage ZSH Config (changing Versions)

```shell
export PATH="$N_PREFIX/bin:$PATH" # add this in ~/.zshrc
# if you get the following error after changing the version by running `n doctor`:
There is an active version of npm shadowing the version installed by n. Check order of entries in PATH.
   installed : /usr/local/bin/npm
      active : /opt/homebrew/bin/npm
# then unlink the via brew installed version like:
brew unlink node
  Unlinking /opt/homebrew/Cellar/node/20.5.1... 5 symlinks removed.
```

### Windows

#### Install Build Tools

```shell
# Windows Build Tools
npm install --global --production windows-build-tools
```

#### Install Python 2.7

```shell
# Install Pyhton 2.7 necessary on windows for npm builds (not 3.x)
# https://www.python.org/downloads/release/python-2716/
```

##### Set python 2.7 Path

```shell
npm config set python C:\Python27\python.exe
```

#### Checks Build Tools & Python

```shell
# Check if python is set
npm config get python

# Check if build tools are installed
npm config get msvs_version
```

### Build From Resource (Some gyp & co related errors)

    npm install --build-from-resource

#### Installing directly from GitHub

    npm install https://github.com/repo/npm_module.git --save

### Brew node / npm Problem: Error: Cannot find module ‘semver’

```shell
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf ~/.npm
brew uninstall –force node
brew install node
```
