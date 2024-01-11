# Python Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setup Conda (Anaconda)](#setup-conda-anaconda)
- [Conda Cheatsheet](#conda-cheatsheet)
  - [Create Conda Environment](#create-conda-environment)
  - [Activate Conda Environment](#activate-conda-environment)
  - [Deactivate Conda Environment](#deactivate-conda-environment)
  - [Remove Conda Environment](#remove-conda-environment)
- [Rename Conda Environment](#rename-conda-environment)

<!-- /code_chunk_output -->


## Setup Conda (Anaconda)

```shell
brew install --cask anaconda
source /opt/homebrew/anaconda3/bin/activate
conda init
```

## Conda Cheatsheet

### Create Conda Environment

```shell
conda create --name <env_name> python=<version>
```

### Activate Conda Environment

```shell
conda activate <env_name>
```

### Deactivate Conda Environment

```shell

conda deactivate
```

### Remove Conda Environment

```shell
conda env remove --name <env_name>
```

## Rename Conda Environment

```shell
conda create --name new_name --clone old_name
conda remove --name old_name --all
```
