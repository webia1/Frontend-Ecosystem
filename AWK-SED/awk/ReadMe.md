# AWK Cookbook

## Show Sentences with specific words

```bash
awk 'BEGIN{RS="\\. "; FS="\n"} /foo\/bar\/|baz/{print $0"."}' textdatei.txt
```

## Find Book Recommendations

```bash
# e.g. in a transcription.txt file
awk '/Buch|Bücher|lesen|Autor/{print}' transcription.txt
```

## Remove backspace characters and the characters before them

```bash
awk '{gsub(/.?\010/, "", $0); print $0}' git_diff_help.txt > clean_git_diff.txt
```
