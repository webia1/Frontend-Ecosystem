---
title: "Example Markdown Configuration for Pandoc"
output:
  pdf_document:
    toc: true
    highlight: tango
    keep_tex: true
    pdf_engine: xelatex
    number_sections: true
pandoc_args:
  - "--pdf-engine=xelatex"
  - "--highlight-style=tango"
  - "--number-sections"
  - "--listings"
geometry:
  - a4paper
  - left=2cm
  - top=1.7cm
  - right=1.5cm
  - bottom=1.2cm
header-includes:
  - |
    ```{=latex}
    \usepackage{xcolor}
    \usepackage{fontspec}
    \usepackage{fvextra}
    \usepackage{caption}
    \usepackage{longtable}
    \usepackage{fancyvrb}
    \usepackage{upquote}
    \usepackage{twemojis}
    \setmonofont{JetBrains Mono}
    \DefineVerbatimEnvironment{Highlighting}{Verbatim}{commandchars=\\\{\},breaklines=true,breakanywhere=true,numbers=left,numbersep=5pt,frame=single}
    \renewcommand{\theFancyVerbLine}{\textcolor{gray}{\tiny\arabic{FancyVerbLine}}}
    \usepackage{hyperref}
    \definecolor{linkcolor}{RGB}{0,0,255}
    \hypersetup{
        colorlinks=true,
        linkcolor=linkcolor,
        filecolor=linkcolor,
        urlcolor=linkcolor,
        citecolor=linkcolor
    }
    \let\oldhref\href
    \renewcommand{\href}[2]{\oldhref{#1}{\textcolor{linkcolor}{#2}}}
    \usepackage{listings}
    \usepackage{zref-abspage}
    \usepackage{mdframed}
    \definecolor{lightgreen}{HTML}{F3FCE3}
    \definecolor{bordergreen}{HTML}{007410}
    \newenvironment{myquote}{%
      \vspace{16pt}%
      \begin{mdframed}[backgroundcolor=lightgreen,leftmargin=0.5cm,linewidth=4pt,leftline=true,rightline=false,topline=false,bottomline=false,linecolor=bordergreen]%
      \bfseries}
    {\end{mdframed}\vspace{16pt}}
    \renewenvironment{quote}{\begin{myquote}}{\end{myquote}}
    \usepackage{parskip}
    \makeatletter
    \renewcommand\paragraph{\@startsection{paragraph}{4}{\z@}%
      {-3.25ex\@plus -1ex \@minus -.2ex}%
      {1.5ex \@plus .2ex}%
      {\normalfont\normalsize\bfseries}}
    \renewcommand\subparagraph{\@startsection{subparagraph}{5}{\z@}%
      {-3.25ex\@plus -1ex \@minus -.2ex}%
      {1.5ex \@plus .2ex}%
      {\normalfont\normalsize\bfseries}}
    \makeatother
    \usepackage[bottom]{footmisc}
    \setlength{\footnotesep}{20pt}
    \addtolength{\skip\footins}{10pt}
    \newcommand{\alert}{\twemoji{1f6a8}\space}
    \newcommand{\alerttext}{\texttwemoji{1f6a8}\space}
    \newcommand{\alertbig}{\twemoji[height=2em]{1f6a8}\space}
        \directlua{luaotfload.add_fallback
      ("emojifallback",
        {
          "NotoColorEmoji:mode=harf;"
        }
      )}

    \setmainfont{TeX Gyre Termes}[
      RawFeature={fallback=emojifallback}
    ]
    ```
---

# Example Configuration for Pandoc

See the *source code of this Markdown file* to see the configuration settings. **Die Reihenfolge im YAML-Block ist sehr wichtig!**

## Introduction

This is an example Markdown configuration file with colored links and highlighted code using JetBrains Mono font[^longnote].

[^longnote]: You have to open this file in a text editor to see the configuration settings.
  BTW: This is a long footnote.

The configuration settings are placed in a so called YAML front matter block at the beginning of the file. The settings are used by the Pandoc document converter to create a PDF file from this Markdown file.

## PDF Generation

If you use assets folder, then better change to the directory, where the markdown file is located and run the following command:

```shell
# This file with xelatex engine
pandoc ExampleConfig.md -o ExampleConfig.pdf --pdf-engine=lualatex --pdf-engine-opt=-shell-escape --toc=true --toc-depth=5 --highlight=tango --number-sections -f markdown+emoji+pipe_tables+raw_html --shift-heading-level-by=-1 -s -o ExampleConfig.pdf
```

## Emojis

💣 👀 😇 🤭 💡 ✅ 🏆 💥 ⚠️ 🧨 🎯 🚫 🔑

- Normal Text \alert  important text.
- Adapts to text size \alerttext
- Bigger Alarm: \alertbig
- Das geht auch `\texttwemoji{smile}`: \texttwemoji{smile}

You can create custom commands for emojis like this, see `Pandoc/Offical-Documentations/twemojis.pdf`.

```yaml
% Light bulb (idea) - 1f4a1
\newcommand{\idea}{\twemoji{1f4a1}\space}
\newcommand{\ideatext}{\texttwemoji{1f4a1}\space}
\newcommand{\ideabig}{\twemoji[height=2em]{1f4a1}\space}

% Man dancing - 1f57a
\newcommand{\dancer}{\twemoji{1f57a}\space}
\newcommand{\dancertext}{\texttwemoji{1f57a}\space}
\newcommand{\dancerbig}{\twemoji[height=2em]{1f57a}\space}

% Key - 1f511
\newcommand{\key}{\twemoji{1f511}\space}
\newcommand{\keytext}{\texttwemoji{1f511}\space}
\newcommand{\keybig}{\twemoji[height=2em]{1f511}\space}

% Prohibited - 1f6ab
\newcommand{\prohibited}{\twemoji{1f6ab}\space}
\newcommand{\prohibitedtext}{\texttwemoji{1f6ab}\space}
\newcommand{\prohibitedbig}{\twemoji[height=2em]{1f6ab}\space}

% Target/Bullseye - 1f3af
\newcommand{\target}{\twemoji{1f3af}\space}
\newcommand{\targettext}{\texttwemoji{1f3af}\space}
\newcommand{\targetbig}{\twemoji[height=2em]{1f3af}\space}

% Firecracker - 1f9e8
\newcommand{\firecracker}{\twemoji{1f9e8}\space}
\newcommand{\firecrackertext}{\texttwemoji{1f9e8}\space}
\newcommand{\firecrackerbig}{\twemoji[height=2em]{1f9e8}\space}

% Warning - 26a0
\newcommand{\warning}{\twemoji{26a0}\space}
\newcommand{\warningtext}{\texttwemoji{26a0}\space}
\newcommand{\warningbig}{\twemoji[height=2em]{26a0}\space}

% Trophy - 1f3c6
\newcommand{\trophy}{\twemoji{1f3c6}\space}
\newcommand{\trophytext}{\texttwemoji{1f3c6}\space}
\newcommand{\trophybig}{\twemoji[height=2em]{1f3c6}\space}

% Alert - 1f6a8 (from previous example)
\newcommand{\alert}{\twemoji{1f6a8}\space}
\newcommand{\alerttext}{\texttwemoji{1f6a8}\space}
\newcommand{\alertbig}{\twemoji[height=2em]{1f6a8}\space}
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

## Nested Headings

### Third Level

Some third level text.

#### Fourth Level

Some fourth level text.

##### Fifth Level

Some fifth level text.
