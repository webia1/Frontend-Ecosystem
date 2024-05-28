# CommandLine OneLiner

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Other Shell Documents in this Repository](#other-shell-documents-in-this-repository)
- [Rename all files in a folder](#rename-all-files-in-a-folder)
- [Delete all Files and Directories (including .files) in current directory](#delete-all-files-and-directories-including-files-in-current-directory)
- [Show only file names without extension](#show-only-file-names-without-extension)
- [Tree on Windows (cygwin)](#tree-on-windows-cygwin)
- [Convert CRLFS to LFS](#convert-crlfs-to-lfs)
- [Find & Delete Files/Directories (-exec)](#find--delete-filesdirectories--exec)
- [Show Directory size](#show-directory-size)
  - [Simple Examples](#simple-examples)
  - [A more sophisticated example](#a-more-sophisticated-example)
- [Search for a file but exclude a directory](#search-for-a-file-but-exclude-a-directory)

<!-- /code_chunk_output -->

## Other Shell Documents in this Repository

See also [Cloud Azure Shell-> Cloud-Co/Azure/Shell/ReadMe.md](/Cloud-Co/Azure/Shell/ReadMe.md)

## Rename all files in a folder

```shell
# set extension to jpg
for f in *; do mv "$f" "$f.jpg"; done

# replace old-word with new-word in all files of current folder
for file in old-word.*; \
  do mv "$file" "${file/old-word/new-word}"; \
  done
```

## Delete all Files and Directories (including .files) in current directory

```shell
find . -mindepth 1 -delete
```

## Show only file names without extension

```shell
ls -1 | sed -e 's/\.js$//'  # in this case *.js

basename --suffix=.js -- *.js
```

## Tree on Windows (cygwin)

```powershell
C:\cygwin\bin\tree -L 2 -I 'node_modules'
```

## Convert CRLFS to LFS

```shell
find . -type f -print0 | xargs -0 dos2unix

find . -type f -print0 | xargs -0 -n 1 -P 4 dos2unix # thread
```

## Find & Delete Files/Directories (-exec)

```shell
find . -name "FILE-TO-FIND" -exec rm -rf {} \; # files & directories
find . -type f -name "FILE-TO-FIND" -exec rm -f {} \; # only files
```

## Show Directory size

### Simple Examples

```shell
du -sh */

du -h -d 1 | sort -n

find . -mindepth 1 -maxdepth 1 -type d | parallel du -s | sort -n

for entry in $(ls); do du -s "$entry"; done | sort -n
```

### A more sophisticated example

Calculate the size of files and directories in the current directory

The command `(find . -depth 1 -type f -exec ls -s {} \;; \ find . -depth 1 -type d -exec du -s {} \;)` is used to find all files and directories in the current directory and calculate their sizes.

- `find . -depth 1 -type f -exec ls -s {} \;` finds all files in the current directory and executes the `ls -s` command to display the file size in kilobytes.
- `find . -depth 1 -type d -exec du -s {} \;` finds all directories in the current directory and executes the `du -s` command to display the directory size in kilobytes.

The output of both commands is combined using the `|` (pipe) operator and sorted numerically using the `sort -n` command.

This command can be useful to quickly determine the sizes of files and directories in a directory.

```shell

(find . -depth 1 -type f -exec ls -s {} \;; \
  find . -depth 1 -type d -exec du -s {} \;) | sort -n

```

## Search for a file but exclude a directory

```shell
find . -name "FILE-TO-FIND" -not -path "./node_modules/*"

# Example
find . -name 'esbuild.config.js' -not -path './node_modules/*'
```
