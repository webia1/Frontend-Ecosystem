<style>

@media print, screen {
  pre[class*="language-"] {
    background-color: #EBEBEB;
    color: black;
    border: 1px dotted black;
  }

  html body blockquote  {
    border: 1px solid;
    border-left: 6px solid black;
    border-color: green;
    padding: 10px;
    color: black
    background-color: #ebebeb

  }

  strong {
    font-size: 120%;
    border-bottom: 2px solid red;
    padding: 1px 2px;
    background-color: yellow;
  }
  em {
    font-size: 120%;
    color: black;
    font-style: normal;
    font-weight: bold;
    border-top: 2px solid blue;
    padding: 1px 2px;
    background-color: yellow;
  }
}



</style>

# Regular Expressions in JavaScript

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Besondere Zeichen](#besondere-zeichen)
- [Optional, Min, Max,..](#optional-min-max)
- [Zeichenklasse](#zeichenklasse)
- [Beispiele](#beispiele)
  - [Zeichenklassen & Wiederholungen](#zeichenklassen-wiederholungen)
  - [Wordboundary](#wordboundary)
  - [UTF8/16/..](#utf816)
  - [Miscellaneous](#miscellaneous)
    - [Zeichenklassen](#zeichenklassen)
    - [Oder](#oder)
    - [Within single qutoes](#within-single-qutoes)
    - [n'te Gruppe (naive Annahme: Zwischen Quotes)](#nte-gruppe-naive-annahme-zwischen-quotes)
    - [n'te Gruppe (besser)](#nte-gruppe-besser)

<!-- /code_chunk_output -->

<div style="page-break-before:always"></div>

## Besondere Zeichen

    ^ $ . , - * + ? = ! : | ( ) [ ] { } \

    \f \n                 Seitenvorschub, Zeilenumbruch
    \r \t \v              Wagenrücklauf, H-Tabulator, V-Tabulator

    \d \D                 digit, non digit
    \s \S                 white space, non white space
    \w \W                 word, non word
    \b \B                 word boundary, non word boundary

    \cI                   horizontal tab
    \p{L}                 any kind of letter from any language

## Optional, Min, Max,..

X is a placeholder for any regular expression (own notation)

    X?                    optional
    X*                    0 oder mehr
    X+                    1 oder mehr
    X{n}                  n mal
    X{n,}                 mindestens n mal
    X{m,n}                mindestens m mal max n mal

## Zeichenklasse

    [abc]                 Zeichenklasse: eines davon

<div style="page-break-before:always"></div>

## Beispiele

### Zeichenklassen & Wiederholungen

    [^0-9]                Keine Ziffern
    [^0-9]+$              Am Ende keine Ziffern
    [0-9]{4,6}            Vier bis sechs Stellen

### Wordboundary

    e\b                   jedes e vor einem "Wordboundary".

> Schul**e** Haus Hos**e** Matratz**e**

### UTF8/16/..

    \u{1f310}

### Miscellaneous

#### Zeichenklassen

    [^0-9]+$            Keine Ziffern am Ende
    [1-9][0-9]*         Zahl ohne führende Null

#### Oder

    http|ftp            http oder ftp

<div style="page-break-before:always"></div>

#### Within single qutoes

    '([^']*)'

> Was heißt "hot", ist es **'heiß'** oder **'kalt'**?

#### n'te Gruppe (naive Annahme: Zwischen Quotes)

Alles zwischen double- or single quotes. Der Fehler: Text dazwischen wird auch ausgewählt:

    (['"]).*\1

> Was heißt **"hot"**, ist es **'heiß' oder 'kalt'**?

#### n'te Gruppe (besser)

Alles zwischen double- or single quotes. (Korrigierte Version des obigen Beispiels)

    (['"])[^'"]*\1

> Was heißt **"hot"**, ist es **'heiß'** oder **'kalt'**?
