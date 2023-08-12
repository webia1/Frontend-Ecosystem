# NodeJS

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Setup](#setup)
  - [Install Mode](#install-mode)
  - [Install n Package Manager](#install-n-package-manager)
    - [Examples](#examples)

<!-- /code_chunk_output -->

## Setup

### Install Mode

Install Brew and then:

```shell
brew install node
```

### Install n Package Manager

```shell
npm i -g n
```
### Manage ZSH Config (changing Versions)

```shell
export PATH="$N_PREFIX/bin:$PATH"
```

#### Examples

Run with sudo:

```shell
n latest         # Install the latest version
n lts            # Long Time Support
n prune          # Remove cached except current
n rm 0.9.4       # Remove v0.9.4
```
