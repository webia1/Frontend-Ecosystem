# Python Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Conda](#conda)
  - [Setup Conda (Anaconda)](#setup-conda-anaconda)
    - [Delete Existing Anaconda Installation (if applicable)](#delete-existing-anaconda-installation-if-applicable)
    - [Install Anaconda](#install-anaconda)
  - [Conda Cheatsheet](#conda-cheatsheet)
    - [Change Conda Prompt Format](#change-conda-prompt-format)
    - [List Environments](#list-environments)
    - [Create Conda Environment](#create-conda-environment)
    - [Activate Conda Environment](#activate-conda-environment)
    - [Deactivate Conda Environment](#deactivate-conda-environment)
    - [Remove Conda Environment](#remove-conda-environment)
    - [Rename Conda Environment](#rename-conda-environment)
    - [Clone/Duplicate Conda Environment](#cloneduplicate-conda-environment)
    - [Disable Automatic Activation of `base`ENV](#disable-automatic-activation-of-baseenv)
  - [Update Base Environment](#update-base-environment)
- [Code Examples](#code-examples)
  - [Create QR Code](#create-qr-code)

<!-- /code_chunk_output -->

## Conda

### Setup Conda (Anaconda)

#### Delete Existing Anaconda Installation (if applicable)

```shell
brew uninstall --cask anaconda
brew cleanup
rm -rf ~/opt/anaconda3
rm -rf ~/anaconda3
rm -rf ~/.anaconda_backup
rm -rf ~/.condarc ~/.conda ~/.continuum
rm -rf ~/Library/Caches/pip
rm -rf ~/Library/Application\ Support/pip
```

#### Install Anaconda

```shell
brew install --cask anaconda
source /opt/homebrew/anaconda3/bin/activate
conda init
```

### Conda Cheatsheet

#### Change Conda Prompt Format

```shell
conda config --set env_prompt '{name} '
```

#### List Environments

```shell
conda env list
```

#### Create Conda Environment

```shell
conda create --name <env_name> python=<version>
```

#### Activate Conda Environment

```shell
conda activate <env_name>
```

#### Deactivate Conda Environment

```shell

conda deactivate
```

#### Remove Conda Environment

```shell
conda env remove --name <env_name>
```

#### Rename Conda Environment

```shell
conda create --name new_name --clone old_name
conda remove --name old_name --all
```

#### Clone/Duplicate Conda Environment

```shell
conda create --name new_name --clone old_name
```

#### Disable Automatic Activation of `base`ENV

```shell
conda config --set auto_activate_base false
```

### Update Base Environment

```shell
conda install python=3.11 # e.g. update to 3.11
conda update --all
python --version # Re-check version
```

## Code Examples

### Create QR Code

```python
import qrcode

# Create qr code instance
qr = qrcode.QRCode(
    version = 1,
    error_correction = qrcode.constants.ERROR_CORRECT_H,
    box_size = 10,
    border = 4,
)

# The data that you want to store
data = 'https://tosomewhere'

# Add data
qr.add_data(data)
qr.make(fit=True)

# Create an image from the QR Code instance
img = qr.make_image()

# Save it somewhere, change the extension as needed:
# img.save("image.png")
# img.save("image.bmp")
# img.save("image.jpeg")
img.save("qr_code.png")
```
