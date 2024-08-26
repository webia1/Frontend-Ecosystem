# NPM Licence Report

## Setup

1. Install the package globally by running `npm install -g license-report`
2. Run `license-report` in the root of your project `license-report --output=markdown > tmp/licences.md`

## Configuration

You can create a configuration file to customize the behavior of license-report. This file allows you to exclude certain packages, change the output format, and make other adjustments.
The configuration file should be in JSON format and can be named `.license-report.json`. Place this file in the root directory of your project.

Here is an example configuration file:

```json
{
  "fields": ["name", "licenseType", "installedVersion"],
  "output": "markdown",
  "package": "./package.json"
}
```

To run `license-report` using the configuration file, use the following command in your npm scripts:

```json
{
  "scripts": {
   "check:licenses": "echo \"\nDon't forget ton install license-port globally: npm i -g license-report\" && npx license-report --only=prod --config ./.license-report.json > tmp/license-report.md && echo \"Check ./tmp/license-report.md\n\"",
  }
}
```
