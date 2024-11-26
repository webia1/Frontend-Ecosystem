---
title: "Example Markdown Configuration for Pandoc"
output:
  pdf_document:
    toc: true
    highlight: tango
    keep_tex: true
    pdf_engine: xelatex
pandoc_args:
  - "--pdf-engine=xelatex"
header-includes:
  - |
    ```{=latex}
    \usepackage{xcolor}
    \usepackage{fontspec}
    \usepackage{listings}
    \usepackage{url}
    \usepackage{soul}
    \usepackage[unicode]{hyperref}
    \setmonofont{JetBrains Mono}
    \definecolor{linkcolor}{RGB}{0,0,255}
    \hypersetup{
      colorlinks=true,
      linkcolor=linkcolor,
      urlcolor=linkcolor,
      citecolor=linkcolor
    }
    \lstset{
      basicstyle=\ttfamily\footnotesize,
      breaklines=true,
      keywordstyle=\color{blue},
      commentstyle=\color{green!60!black},
      stringstyle=\color{red},
      numbers=left,
      numberstyle=\tiny,
      numbersep=5pt,
      frame=single,
      framesep=5pt
    }
    \let\oldhref\href
    \renewcommand{\href}[2]{\oldhref{#1}{\color{linkcolor}\underline{#2}}}
    ```
---

# Example Configuration for Pandoc

See the *source code of this Markdown file* to see the configuration settings. **Die Reihenfolge im YAML-Block ist sehr wichtig!**

## Introduction

This is an example Markdown configuration file with colored links and highlighted code using JetBrains Mono font. You have to open this file in a text editor to see the configuration settings.

The configuration settings are placed in a so called YAML front matter block at the beginning of the file. The settings are used by the Pandoc document converter to create a PDF file from this Markdown file.

## PDF Generation

If you use assets folder, then better change to the directory, where the markdown file is located and run the following command:

```shell
pandoc ExampleConfig.md -o \
  ExampleConfig.pdf --pdf-engine=xelatex \
  && echo "PDF generated successfully" || echo "Error generating PDF"
```

## Links

Here's a [blue link to Google](https://www.google.com).

## Block Quotes

Here's a block quote:

> This is a block quote.

## Code Highlighting

### Within single backticks

Here's an example `inline code` in JetBrains Mono.

### Python Code

Here's an example of Python code with syntax highlighting in JetBrains Mono:

```python
def greet(name):
```

### TypeScript Code

Here's an example of TypeScript code with syntax highlighting in JetBrains Mono:

```typescript
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

### Bash & Shell

And here's some bash code:

```bash
# bash code
echo "Hello, World!"
for i in {1..5}
do
   echo "Count: $i"
done
```

```shell
# shell code
echo "Hello, World!"
for i in {1..5}
do
   echo "Count: $i"
done
```
