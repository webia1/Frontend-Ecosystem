# VSCode Setup

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Themes & Fonts](#themes--fonts)
  - [Font](#font)
  - [Color Theme - VSCode Standard Dark Modern](#color-theme---vscode-standard-dark-modern)
  - [Icon Theme &rarr; Material Icon Theme](#icon-theme-rarr-material-icon-theme)
  - [Production Theme &rarr; fluent-icons](#production-theme-rarr-fluent-icons)
- [Extensions](#extensions)
  - [Basis Extensions](#basis-extensions)
  - [Useful Coding Extensions](#useful-coding-extensions)
    - [Auto Close Tag](#auto-close-tag)
- [Git](#git)
- [Settings](#settings)
  - [Editor, Inline Suggestions, Minimap & Co.](#editor-inline-suggestions-minimap--co)
  - [Terminal & Co](#terminal--co)
  - [TypeScript](#typescript)
  - [Local Web Development](#local-web-development)
  - [SCSS](#scss)
  - [Default Formatter](#default-formatter)
    - [Prettier Details](#prettier-details)
      - [Prose Wrap](#prose-wrap)
  - [Workbench](#workbench)
  - [Workbench Color Customizations](#workbench-color-customizations)
  - [Miscellaneous](#miscellaneous)

<!-- /code_chunk_output -->

## Themes & Fonts

### Font

```shell
    "editor.fontFamily": "JetBrains Mono",
    "editor.fontLigatures": true,
    "editor.codeLensFontFamily": "Jetbrains Mono",
```

### Color Theme - VSCode Standard Dark Modern

> See **Workbench** further below

```json
 "workbench.colorTheme": "Gitkraken Dark",
```

1) [editor.semanticTokenColorCustomizations](./editor.semanticTokenColorCustomizations.json)
1) [editor.tokenColorCustomizations](./editor.tokenColorCustomizations.json)

### Icon Theme &rarr; Material Icon Theme

**Attention:** Not Material Theme Icon &rarr; **Material Icon Theme**

<https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme>

### Production Theme &rarr; fluent-icons

<https://marketplace.visualstudio.com/items?itemName=miguelsolorio.fluent-icons>

## Extensions

### Basis Extensions

```shell
dbaeumer.vscode-eslint          # ESLint
esbenp.prettier-vscode          # ESLint Prettier
firsttris.vscode-jest-runner    # Jest Runner
miguelsolorio.fluent-icons      # Production Icons
PKief.material-icon-theme       # Icon Theme

DavidAnson.vscode-markdownlint  # Markdown Linter
redhat.vscode-xml               # XML Linter
```

### Useful Coding Extensions

#### Auto Close Tag

```shell
formulahendry.auto-close-tag    # Auto Close Tag
```

```json
"auto-close-tag.disableOnLanguage": ["typescript"],
```

## Git

- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

```shell
eamodio.gitlens
mhutchie.git-graph
```

```json
"git.autofetch": true,
"git.confirmSync": false,
"git.openRepositoryInParentFolders": "never",
"gitlens.views.branches.branches.layout": "list",
```

## Settings

### Editor, Inline Suggestions, Minimap & Co.

```json
  "editor.codeLensFontFamily": "Jetbrains Mono",
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.fontSize": 13.3,
  "editor.inlineSuggest.enabled": true,
  "editor.inlineSuggest.showToolbar": "always",
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": false,
  "editor.tabSize": 2,
```

### Terminal & Co

> **Terminal ANSI Colors**
> See workbench.colorCustomizations further below

```json
"terminal.integrated.fontFamily": "Jetbrains Mono",
"terminal.integrated.fontSize": 13.7,
"terminal.integrated.gpuAcceleration": "off",
"terminal.integrated.inheritEnv": false,
"terminal.integrated.localEchoStyle": "dim",
"terminal.integrated.scrollback": 10000,
"terminal.integrated.sendKeybindingsToShell": true,
"terminal.integrated.smoothScrolling": true,
```

### TypeScript

```json
"typescript.updateImportsOnFileMove.enabled": "always",
```

### Local Web Development

```json
"http.systemCertificates": false,
```

### SCSS

```json
"scss.lint.duplicateProperties": "warning",
"scss.lint.emptyRules": "ignore",
"scss.lint.float": "warning",
```

### Default Formatter

Better `formatOnSave` seperately on each file type:

```json
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint",
    "editor.formatOnSave": true
  },
  "[svg]": {
    "editor.defaultFormatter": "redhat.vscode-xml",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml",
    "editor.formatOnSave": true
  },
```

#### Prettier Details

##### Prose Wrap

```json
 "prettier.proseWrap": "never",
```

Source: <https://prettier.io/docs/en/options.html>

By default, Prettier will not change wrapping in markdown text since some services use a linebreak-sensitive renderer, e.g. GitHub comments and BitBucket. To have Prettier wrap prose to the print width, change this option to "always". If you want Prettier to force all prose blocks to be on a single line and rely on editor/viewer soft wrapping instead, you can use `"never"`.

Valid options:

- `"always"` - Wrap prose if it exceeds the print width.
- `"never"` - Un-wrap each block of prose into one line.
- `"preserve"` - Do nothing, leave prose as-is. _First available in v1.9.0_

| Default | CLI Override | API Override |
| --- | --- | --- |
| `"preserve"` | `--prose-wrap <always|never|preserve>` | `proseWrap: "<always|never|preserve>"` |

### Workbench

```json
"workbench.startupEditor": "welcomePage",
"workbench.colorTheme": "Gitkraken Dark",
"workbench.fontAliasing": "default",
"workbench.iconTheme": "material-icon-theme",
"workbench.productIconTheme": "fluent-icons",
"workbench.startupEditor": "welcomePage"
```

### Workbench Color Customizations

```json
  "workbench.colorCustomizations": {
    "editor.background": "#202026",
    "editor.selectionBackground": "#007bff",
    "editorUnnecessaryCode.border": "#fd7403dc",
    "tab.activeBackground": "#614a00",
    "tab.activeBorder": "#ffc4006a",
    "tab.activeBorderTop": "#ffc400",
    "tab.activeForeground": "#ffffff",
    "tab.border": "#ffc4006a",
    "tab.inactiveForeground": "#01d9f5f2",
    "tab.unfocusedInactiveForeground": "#01d9f5f2",
    "terminal.ansiBlue": "#1a3563",
    "terminal.ansiBrightGreen": "#6fff00",
    "terminal.ansiBrightWhite": "#ffffff",
    "terminal.ansiGreen": "#2b6d02",
    "terminal.ansiRed": "#cd053e",
    "terminal.ansiWhite": "#d1f7fd",
    "terminal.ansiYellow": "#ffe600",
    "terminal.background": "#131212",
    "terminal.foreground": "#bcf487d7",
    "titleBar.activeBackground": "#ffc4002a",
    "titleBar.activeForeground": "#ffffff",
    "titleBar.inactiveForeground": "#15202b99"
  },
```

### Miscellaneous

```json
"redhat.telemetry.enabled": false,
"explorer.confirmDelete": false,
```
