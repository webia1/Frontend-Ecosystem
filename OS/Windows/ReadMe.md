# Windows 

## Kill Port Process

```bash
#1 find process id
netstat -ano | findstr :8081

# kill process
taskkill /pid 12345 /f
```


## Proxy Server With Credentials

Start Powershell with admin rights and:

    netsh winhttp import proxy source=ie
    $Wcl=New-Object System.Net.WebClient
    $Creds=Get-Credential
    $Wcl.Proxy.Credentials=$Creds
    
    

## Proxy Server - Without Credentials

Start Powershell with admin rights and:

    netsh winhttp set proxy <Proxyserver:Port>
    netsh winhttp import proxy source=ie
    netsh winhttp set proxy <Proxyserver:Port> bypass-list="*.mydomain.intern" 
    netsh winhttp show proxy
    netsh winhttp reset proxy  // Remove all

### Tunneling through a socks proxy

    netsh winhttp set proxy proxy-server="socks=localhost:9090" bypass-list="localhost"


## Setting Environment Variables with Rapid Environment Editor

[https://www.rapidee.com/en/download](https://www.rapidee.com/en/download)

## Install Build Tools for NPM

    npm i -g --production windows-build-tools
    
## Set Proxy for NPM

    npm config set proxy http://---myproxy---:PORT
    npm config set https-proxy http(s)://---myproxy---:PORT

## Set Proxy for Git

    git config --global http.proxy http://---myproxy---:PORT
