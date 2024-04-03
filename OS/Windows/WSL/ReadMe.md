# Windows Setup

If you want to use Windows as your primary development environment, you can use Windows Subsystem for Linux (WSL) to run a Linux distribution on Windows. This will allow you to use the same tools and commands as you would on a Linux machine and everything will work the same way.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install WSL](#install-wsl)
- [Install Basic Packages](#install-basic-packages)
  - [Install "Oh My Zsh"](#install-oh-my-zsh)
    - [Configure Zsh](#configure-zsh)
- [Configure Git in WSL Terminal](#configure-git-in-wsl-terminal)
- [Set Name Server](#set-name-server)
  - [Edit wsl.conf](#edit-wslconf)
  - [Edit resolv.conf](#edit-resolvconf)
  - [Restart Shell](#restart-shell)
- [Create a personal access token (Azure DevOps)](#create-a-personal-access-token-azure-devops)
- [Set VSCode as Standard Editor as Superuser in WSL Terminal](#set-vscode-as-standard-editor-as-superuser-in-wsl-terminal)

<!-- /code_chunk_output -->

## Install WSL

```shell
wsl --install -d Debian # Same on the Server
```

You will need to set a new username and password for the new Linux distribution. This username and password are separate from your Windows username and password. You will need to install many packages, choose a memorable username and password.

## Install Basic Packages

```shell
sudo apt install zsh  # Install Zsh
sudo apt install curl # Install Curl
sudo apt install wget # Install Wget
sudo apt install git  # Install Git
```

### Install "Oh My Zsh"

Install and change the default shell to Zsh:

```shell
 sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

#### Configure Zsh

```shell
code ~/.zshrc # That will install VSCode Server for WSL
```

And make the following changes:

```shell
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="agnoster"
ENABLE_CORRECTION="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"
HIST_STAMPS="yyyy/mm/dd"
COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
  )

source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8

if [[ -n $SSH_CONNECTION ]]; then
    export EDITOR='code'
else
    export EDITOR='code'
fi


```

and restart the terminal:

```shell
zsh -l
```

**You will get 2 errors:**

```shell
[oh-my-zsh] plugin 'zsh-syntax-highlighting' not found
[oh-my-zsh] plugin 'zsh-autosuggestions' not found
```

**Now we will add them:**

```shell
# Install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Reload the terminal
zsh -l
```

You should see now a beautiful terminal.

## Configure Git in WSL Terminal

```shell
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

## Set Name Server

If you're working in Linux, it's useful to understand your environment, including the DNS server, since it's key for web applications. To use the same DNS server in WSL as on your Windows machine:

Open a normal Command Prompt in Windows (not WSL Terminal) and run the command:

```shell
ipconfig /all
```

In the "DNS Servers" section, you'll find the DNS server addresses for your current network device as used by your Windows machine. It appears as follows:

```shell
DNS Servers ...........: <IPv6 Address>
                         <IPv4 Address>

```

You can apply these values in WSL as well. Open a WSL terminal and proceed with the following steps.

### Edit wsl.conf

```shell
sudo nano /etc/wsl.conf
```

And add the following (so that WSL does not overwrite the resolv.conf file):

```shell
[network]
generateResolvConf = false
```

### Edit resolv.conf

```shell
sudo nano /etc/resolv.conf
```

In the previous step, you have seen the DNS servers that your Windows machine is using. You can use them in WSL. Add them in this manner:

```shell
nameserver some IPv6 Address # (e.g. fe80::1%lo)
nameserver some IPv4 Address # (e.g. 1.1.1.1)
```

### Restart Shell

```shell
zsh -l
```

## Create a personal access token (Azure DevOps)

Here (set full access to the token) via personal settings: <https://dev.azure.com/YourOrganization/_usersSettings/tokens>

Then in your WSL Terminal:

```shell
git config --global credential.helper store # Will store your token encrypted
```

Then you can add, commit and push normally. The first time you push, you will be asked for your password and you use your newly created "personal access token". After that, it will be stored.

```shell
git add .
git commit -m "Your Message"
git push # Will ask for your password, use your personal access token
```

## Set VSCode as Standard Editor as Superuser in WSL Terminal

Not recommended (Because of security risks and temporary write issues)! But if you want to set VSCode as the standard editor in WSL, you can do it as follows:

```shell
sudo apt install whereis
whereis code # Find the path to the code executable
sudo update-alternatives --install /usr/bin/editor editor "<path zu vscode>" 50
sudo update-alternatives --config editor
```
