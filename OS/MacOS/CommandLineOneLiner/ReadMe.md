# MacOs CommandLine OneLiner

## Rename all files in a folder

```shell
# set extension to jpg
for f in *; do mv "$f" "$f.jpg"; done

# replace old-word with new-word in all files of current folder
for file in old-word.*; \
  do mv "$file" "${file/old-word/new-word}"; \
  done
```
