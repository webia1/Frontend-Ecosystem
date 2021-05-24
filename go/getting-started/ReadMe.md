# Go - Getting Started

## Install via Brew

```shell
brew install go
```

## Uninstall

Online: <https://blog.dharnitski.com/2019/04/06/uninstall-go-on-mac/>

### Previously installed via Brew

```shell
brew uninstall dep
brew uninstall go
```

### Previously installed via Pkgutil

```shell
pkgutil --pkgs | grep go   # find in the list
sudo pkgutil --forget org.golang.go
```

## Go Versions Manager

Online: <https://github.com/kevincobain2000/gobrew>

### Installing

```shell
curl -sLk https://git.io/gobrew | sh -  # Installation
gobrew use 1.16.4 # Download, install and use in one step

gobrew install 1.16.4  # install only
gobrew use 1.16.4 # change to this version

go uninstall 1.16 # uninstall a certain version
```

### ENV VARIABLES (Important for VSCode)

VSCode needs GOPATH and GOBIN to detect the currently used version,
if e.g. a package manager like gobrew is installed:

```shell
# ~/.zshrc excerpt

export PATH="$HOME/.gobrew/current/bin:$HOME/.gobrew/bin:$PATH"
export GOPATH="$HOME/.gobrew/current"
export GOBIN="$HOME/.gobrew/current/bin"
```
