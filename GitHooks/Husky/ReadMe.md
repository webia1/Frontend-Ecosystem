# Husky

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Introduction](#introduction)
  - [Why Husky?](#why-husky)
  - [Why GitHooks?](#why-githooks)
- [Installation & Initialisation](#installation--initialisation)
- [`pre-commit` Hook](#pre-commit-hook)
  - [Add Git Hook Script](#add-git-hook-script)
- [`pre-push` Hook](#pre-push-hook)
  - [Configure Husky for `pre-push`](#configure-husky-for-pre-push)
  - [Git Hook Skript hinzufügen](#git-hook-skript-hinzufügen)

<!-- /code_chunk_output -->

## Introduction
### Why Husky?

Husky is a tool that makes it easy to create Git hooks. Git hooks are scripts that run automatically every time a particular event occurs in a Git repository. They let you customize Git’s internal behavior and trigger customizable actions at key points in the development life cycle.

### Why GitHooks?

Git hooks are a great way to enforce code quality standards and prevent bad code from being committed to your repository. They can also be used to automate repetitive tasks and improve your team’s productivity.

## Installation & Initialisation

```shell
npm i -D husky # installs as dev dependency
npx husky install # creates .husky folder
```

## `pre-commit` Hook

In your `package.json`, add the following, for example:

```json
"husky": {
      "hooks": {
        "pre-commit": "nx lint && nx test"
      }
    }`
```

(replace or remove `nx test` if not needed)

### Add Git Hook Script

```shell
npx husky add .husky/pre-commit "npm run lint"
```

Replace `"npm run lint"` with the command that runs your lint checks.

This configuration will execute the `pre-commit` hook every time a developer attempts to make a commit. If the linter throws any errors, the commit will be rejected until those errors are fixed.

Make sure all team members have Husky and the necessary dependencies installed for the hook to work correctly.

## `pre-push` Hook

### Configure Husky for `pre-push`

Modify your Husky configuration to add a `pre-push` hook. In your `package.json`, you should insert the following:

```json
"husky": {
  "hooks": {
    "pre-push": "nx lint && nx test"
  }
}
```

This hook executes `nx lint` to check all lint rules and `nx test` for running tests (replace or remove `nx test` if not needed).

### Git Hook Skript hinzufügen

Add a `pre-push` hook script:

```shell
npx husky add .husky/pre-push "npm run lint"
```

(Replace `"npm run lint"` with the command that runs your lint checks.)
