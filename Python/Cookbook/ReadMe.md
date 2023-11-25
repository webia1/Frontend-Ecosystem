# Python Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

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
