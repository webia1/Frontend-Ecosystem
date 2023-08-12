# NodeJS


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setup](#setup)
  - [Install Mode](#install-mode)
  - [Install n Package Manager](#install-n-package-manager)
  - [Trouble Shooting](#trouble-shooting)
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
### Trouble Shooting

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

### Examples

Run with sudo:

```shell
n latest         # Install the latest version
n lts            # Long Time Support
n prune          # Remove cached except current
n rm 0.9.4       # Remove v0.9.4
```
