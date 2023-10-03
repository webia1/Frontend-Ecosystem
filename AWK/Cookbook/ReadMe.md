# AWK Cookbook

## Remove backspace characters and the characters before them

```bash
awk '{gsub(/.?\010/, "", $0); print $0}' git_diff_help.txt > clean_git_diff.txt
```
