# Rocky

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Rocky](#rocky)
  - [Create Server](#create-server)
  - [Login](#login)
  - [Install Packages 📦](#install-packages-)
    - [Add additional Repositories](#add-additional-repositories)
      - [EPEL](#epel)
      - [Remi](#remi)
      - [RPM Fusion](#rpm-fusion)

<!-- /code_chunk_output -->

## Create Server

Via Hetzner Cloud Console and

&#128204; upload your SSH key:

```shell
ssh-keygen -t rsa -b 4096 -C "my@email.domain" -f ~/.ssh/path key-name
pbcopy < ~/.ssh/path/key-name.pub
```

Add **no** `server init config` first.

## Login

```shell
ssh -i ~/.ssh/key root@<IP>
```

## Install Packages 📦

### Add additional Repositories

⚠️ Add at the beginning **only the EPEL repository**. The other repositories will be added if needed.

#### EPEL

```shell
dnf install epel-release
```

#### Remi

```shell
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

#### RPM Fusion

```shell
dnf install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm
dnf install https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
```
