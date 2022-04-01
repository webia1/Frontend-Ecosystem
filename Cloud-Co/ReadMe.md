# Cloud Co - Google/Azure/AWS/CF/..

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Cloud Co - Google/Azure/AWS/CF/..](#cloud-co-googleazureawscf)
  - [Cloud Foundry](#cloud-foundry)
    - [Login (MacOS/Zsh)](#login-macoszsh)
    - [Spaces](#spaces)
    - [Target](#target)
    - [Apps](#apps)

<!-- /code_chunk_output -->

## Cloud Foundry

### Login (MacOS/Zsh)

Better create an alias in zsh (within company network, you can use the key `--skip-ssl-validation`)

```shell
alias cfl2="cf login -a <SERVER> -u <USERNAME> \
  -p $(security find-generic-password -w -s \
  'CloudFoundry'  -a '<USERNAME>') --skip-ssl-validation"
```

You have to add your password to KeyChain before:

```shell
sudo security add-generic-password -s \
  'CloudFoundry'  -a '<USERNAME>' -w '<PASSWORD>'
```

### Spaces

`$ cf spaces`

### Target

```shell
$ cf t                # shows current target
$ cf t <egMYSPACE>    # sets the target
```

### Apps

```shell
$ cf apps             # shows the apps in the current space
$ cf delete <APPNAME> # deletes the app
```
