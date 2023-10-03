---
title: "Markdown"
output: pdf_document
toc: true
toc-depth: 6
number-sections: true
highlight-style: kate
---

# Markdown

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Frontmatter](#frontmatter)
- [Simple Table Format for Pandoc](#simple-table-format-for-pandoc)
  - [Pandoc Lua Filters](#pandoc-lua-filters)
- [VSCode Extension](#vscode-extension)
  - [Markdown Preview Enhanced](#markdown-preview-enhanced)
    - [Install Pandoc](#install-pandoc)

<!-- /code_chunk_output -->

## Frontmatter

That's the so called frontmatter and it should be placed at the beginning of the markdown file. Following and more settings are possible:

```yaml
---
title: "Markdown"
output: pdf_document
toc: true
toc-depth: 6
number-sections: true
highlight-style: kate
---
```

But it is better to generate `toc` by `markdown-preview-enchanced`, because you can set here not only the depts of the `toc`, but also the starting level and the end level, e.g. `depthFrom=2 depthTo=4`.

"However, Pandoc can number the chapters and sub-chapters better, something that markdown-preview-enhanced doesn't do as well."

If you want to create a print document, use pandoc's toc, if you want to read at the internet, use markdown-preview-enhanced's toc. In this file, both are used.

## Simple Table Format for Pandoc

Prettier has still problems with markdown-linters in VSCode. If you use prettier, it changes its formatting and table is broken. Therefore use markdownlint instead and change the settings for markdown in vscodesettings to:

```json
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint",
    "editor.formatOnSave": true,
  },
```

To be absolutely sure, that `prettier` ignores all markdown files, add the following to your `.prettierignore` file:

```shell
*.md
```

So finally, you can use this beautiful pandoc table format:

-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------

On the other side: Chrome Puppeteer will ignore the alignments, but it will be rendered correctly in the pdf.

### Pandoc Lua Filters

Pandoc Lua Filters are a powerful way to extend Pandoc. They are written in Lua and can be used to modify the abstract syntax tree (AST) that Pandoc uses to represent the document being converted. This allows you to customize look and feel, add metadata, and perform many other functions. Lua filters can be used with all of Pandoc’s input formats (Markdown, reStructuredText, HTML, LaTeX, etc.), and can produce any of its output formats (including native Haskell formats).
...

See [Pandoc Lua Filters](https://pandoc.org/lua-filters.html) for more details.

## VSCode Extension

### Markdown Preview Enhanced

See [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/) for more details. It is a powerful extension that enables you to preview markdown files, but also to export them in different formats, e.g. pdf, html, docx, etc.

In this context is pandoc is a wunderful addon for markdown-preview-enhanced, it can renders beautifully designed academic (whitepapers) pdf files.

#### Install Pandoc

```shell
brew install pandoc
brew install basictex
```

Set the following vscode `markdown-preview-enhanced` setting for for pandoc:

```plaintext
Markdown-preview-enhanced: Latex Engine
Default latex engine for Pandoc export and latex code chunk.

pdflatex
```

Further Details:

- [Pandoc](https://pandoc.org/installing.html)
