# VSCode Cookbook

## Export/Import Extensions

```shell
code --list-extensions > extensions-list.txt
cat extensions-list.txt | xargs -L 1 code --install-extension
```
