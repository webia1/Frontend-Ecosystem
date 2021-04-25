## Show only file names without extension

    ls -1 | sed -e 's/\.js$//'  # in this case *.js
    basename --suffix=.js -- *.js

## Tree on Windows

    C:\cygwin\bin\tree -L 2 -I 'node_modules'

## Convert CRLFS to LFS 

```
find . -type f -print0 | xargs -0 dos2unix

find . -type f -print0 | xargs -0 -n 1 -P 4 dos2unix // thread
```

## Find & Delete Files/Directories (-exec)

```
find . -name "FILE-TO-FIND" -exec rm -rf {} \; // files & directories
find . -type f -name "FILE-TO-FIND" -exec rm -f {} \; // only files
```
## Show Directory size

```
du -sh */         
du -h -d 1 | sort -n
find . -mindepth 1 -maxdepth 1 -type d | parallel du -s | sort -n
for entry in $(ls); do du -s "$entry"; done | sort -n
(find . -depth 1 -type f -exec ls -s {} \;; find . -depth 1 -type d -exec du -s {} \;) | sort -n

```
## ls 
