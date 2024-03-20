# Shell within Azure Web App

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [LogFiles](#logfiles)
  - [Show](#show)
  - [Sort](#sort)
- [Change or Add Environment Variables](#change-or-add-environment-variables)

<!-- /code_chunk_output -->

## LogFiles

After Deployment via SSH

### Show

```shell
tail -f /home/LogFiles/application.log # <- replace with your log file
```

### Sort

```shell
ls -l --time-style=+%d-%m | grep `date +%d-%m` # Assumed date format: dd-mm
```

or

```shell
cd /home/LogFiles
find . -type f -mtime 0 # Files modified today
```

## Change or Add Environment Variables

```shell
echo 'export PORT=8080' >> ~/.profile
````

and restart the Web App.

## Show OS Version

```shell
cat /etc/os-release
```

## Kill Port

```shell
sudo kill $(sudo lsof -t -i:4200) # MacOS
sudo kill $(sudo lsof -t -i:4200) -s TCP:LISTEN # Linux
sudo fuser -k 4200/tcp # Linux

# or

sudo netstat -tulnvp | grep 4200 # detect PID
sudo kill -9 <PID>

```

## Show Running Webserver

```shell
sudo netstat -tulnvp | grep 8080 # or
sudo lsof -i -P -n | grep LISTEN # or
sudo ss -tulw # or
ps -aux | grep -E 'nginx|apache2|httpd' # or
sudo systemctl status nginx # if using systemd and nginx
```
