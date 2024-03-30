---
title: "Markdown"
output: pdf_document
toc: true
toc-depth: 6
number-sections: true
highlight-style: kate
---

# Markdown

E.g. **Markdown Preview Enhanced** is a powerful extension that enables you to preview markdown files, but also to export them in different formats, e.g. pdf, html, docx, etc.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Customize CSS](#customize-css)
- [Line Numbers in Code Blocks](#line-numbers-in-code-blocks)
- [Frontmatter](#frontmatter)
- [Simple Table Format for Pandoc](#simple-table-format-for-pandoc)
  - [Pandoc Lua Filters](#pandoc-lua-filters)
- [VSCode Extension](#vscode-extension)
  - [Markdown Preview Enhanced](#markdown-preview-enhanced)
    - [Install Pandoc](#install-pandoc)
  - [Ebooks & Calibre](#ebooks--calibre)
    - [Install Calibre on MacOS](#install-calibre-on-macos)
    - [Set SymLink to ebook-convert](#set-symlink-to-ebook-convert)
    - [Start writing eBook](#start-writing-ebookhttpsshd101wyygithubiomarkdown-preview-enhancedebookidstart-writing-ebook)

<!-- /code_chunk_output -->

## Customize CSS

F1 -> Markdown Preview Enhanced: Customize CSS

```css
/* Please visit the URL below for more information: */
/*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */

.markdown-preview.markdown-preview {
  pre, code {
    white-space: pre-wrap;
  }
}
```

## Line Numbers in Code Blocks

See source code of this markdown file for more details.

```sh{.line-numbers}
# See white-space: pre-wrap; in the css above
$ for i in $(seq 1 10); do
    echo "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
done
```

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

**TOC** is the table of contents.

But it is better to generate `toc` by `markdown-preview-enchanced`, because you can set here not only the depts of the `toc`, but also the starting level and the end level, e.g. `depthFrom=2 depthTo=4`.

However, **Pandoc** can **number the chapters and sub-chapters better**, something that markdown-preview-enhanced doesn't do as well.

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

So finally, you can use this beautiful pandoc table format (You have to set **pandoc** as your **default markdown renderer** in `markdown-preview-enhanced`):

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

**GitHub cannot render the table correctly.**

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

##### Front Matter Example

```yaml
---
title: "Document Title"
output:
  pdf_document:
    toc: true
    number_sections: true
    highlight: tango
    fontsize: 11pt
    geometry: margin=1in
    papersize: A4
---
```

See more online: <https://pandoc.org/MANUAL.html#variables-for-latex>

##### [Pandoc Arguments](https://shd101wyy.github.io/markdown-preview-enhanced/#/pandoc-word?id=pandoc-arguments)

If there are pandoc features you want to use that lack equivalents in the YAML options described above you can still use them by passing custom `pandoc_args`. For example:

```
---
title: "Habits"
output:
  word_document:
    pandoc_args: ["--csl", "/var/csl/acs-nano.csl"]
---
```

##### [Shared Options](https://shd101wyy.github.io/markdown-preview-enhanced/#/pandoc-word?id=shared-options)

If you want to specify a set of default options to be shared by multiple documents within a directory you can include a file named `_output.yaml` within the directory. Note that no YAML delimiters or enclosing output object are used in this file. For example:

**\_output.yaml**

```
word_document:
  highlight: zenburn
```

All documents located in the same directory as `_output.yaml` will inherit it’s options. Options defined explicitly within documents will override those specified in the shared options file.

### Ebooks & Calibre

#### Install Calibre on MacOS

```shell
brew install --cask calibre
```

#### Set SymLink to ebook-convert

```shell
sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin
```

#### [Start writing eBook](https://shd101wyy.github.io/markdown-preview-enhanced/#/ebook?id=start-writing-ebook)

You can set up a ebook configuration by simply adding `ebook front-matter` into your markdown file.

```
---
ebook:
  theme: github-light.css
  title: My eBook
  authors: shd101wyy
---
```
