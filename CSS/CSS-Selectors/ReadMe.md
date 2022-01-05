# CSS Selectors (Except)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Further Reading](#further-reading)
- [All elements](#all-elements)
- [All children](#all-children)
- [ALL a IN each li](#all-a-in-each-li)
- [Only direct children IN each li](#only-direct-children-in-each-li)
- [Only first immediately following p after each ul](#only-first-immediately-following-p-after-each-ul)
- [All following p after each ul](#all-following-p-after-each-ul)
- [All a with title attribut](#all-a-with-title-attribut)
- [All a with href = “foo”](#all-a-with-href-foo)
- [All a containing the given chunk somewhere it the attribut](#all-a-containing-the-given-chunk-somewhere-it-the-attribut)
- [Any Attribut containing the chunk, in this case “data”](#any-attribut-containing-the-chunk-in-this-case-data)
- [All a with beginning “http” in the href attribut](#all-a-with-beginning-http-in-the-href-attribut)
- [… ending with “.jpg”](#ending-with-jpg)
- [foo has a spaced-separated list of values AND “xyz” is somewhere in the list x](#foo-has-a-spaced-separated-list-of-values-and-xyz-is-somewhere-in-the-list-x)
- [Checked radio buttons](#checked-radio-buttons)
- [Checked check-boxes](#checked-check-boxes)
- [Append an element after an element](#append-an-element-after-an-element)
- [Exclude all divs with the id foo](#exclude-all-divs-with-the-id-foo)
- [Exclude all divs with class bar](#exclude-all-divs-with-class-bar)
- [All elements except each p](#all-elements-except-each-p)
- [tag::pseudoElement](#tagpseudoelement)
- [First lines of each p](#first-lines-of-each-p)
- [First letter of each p](#first-letter-of-each-p)
- [nth-child (not zero based integer)](#nth-child-not-zero-based-integer)
- [nth from last child](#nth-from-last-child)
- [Every second row](#every-second-row)
- [From the end nth type](#from-the-end-nth-type)
- [First child](#first-child)
- [Last child](#last-child)
- [With single child](#with-single-child)
- [All divs with a single p](#all-divs-with-a-single-p)
- [Without siblings in its parent](#without-siblings-in-its-parent)
- [First children with a certain type](#first-children-with-a-certain-type)
- [Link](#link)
- [Visited](#visited)
- [Hover](#hover)

<!-- /code_chunk_output -->

## Further Reading

- [Adjacent sibling combinator](/en-US/docs/Web/CSS/Adjacent_sibling_combinator)
- [Attribute selectors](/en-US/docs/Web/CSS/Attribute_selectors)
- [Child combinator](/en-US/docs/Web/CSS/Child_combinator)
- [Class selectors](/en-US/docs/Web/CSS/Class_selectors)
- [Column combinator](/en-US/docs/Web/CSS/Column_combinator)
- [Descendant combinator](/en-US/docs/Web/CSS/Descendant_combinator)
- [General sibling combinator](/en-US/docs/Web/CSS/General_sibling_combinator)
- [ID selectors](/en-US/docs/Web/CSS/ID_selectors)
- [Selector list](/en-US/docs/Web/CSS/Selector_list)
- [Type selectors](/en-US/docs/Web/CSS/Type_selectors)
- [Universal selectors](/en-US/docs/Web/CSS/Universal_selectors)

## All elements

      * {..}

## All children

    #container * {..}

## ALL a IN each li

      li a {..}

## Only direct children IN each li

    li > a {..}

## Only first immediately following p after each ul

    ul + p

## All following p after each ul

    ul ~ p {}

## All a with title attribut

    a[title] {..}

## All a with href = “foo”

    a[href=”foo”] {..}

## All a containing the given chunk somewhere it the attribut

    a[href*=”chunk”] {..}

## Any Attribut containing the chunk, in this case “data”

    a[data-*=”foo”]{..}

## All a with beginning “http” in the href attribut

    a[href^=”http”] {..}

## … ending with “.jpg”

    a[href$=”.jpg”]{..}

## foo has a spaced-separated list of values AND “xyz” is somewhere in the list x

    [foo~=”xyz”]

## Checked radio buttons

    input[type=radio]:checked {..}

## Checked check-boxes

    input[type=checkbox]:checked {..}

## Append an element after an element

    x:after {..}

## Exclude all divs with the id foo

    div:not(#foo) {..}

## Exclude all divs with class bar

    div:not(.bar) {..}

## All elements except each p

    *:not(p) {..}

## tag::pseudoElement

    x::pseudoElement {..}

## First lines of each p

    p::first-line {..}

## First letter of each p

    p::first-letter {..}

## nth-child (not zero based integer)

    x:nth-child(n) {..}

## nth from last child

    x:nth-last-child(n) {..}

## Every second row

    tr:nth-of-type(2) {..}

## From the end nth type

    x:nth-last-of-type(n) {..}

## First child

    x:first-child {..}

## Last child

    x:last-child {..}

## With single child

    x:only-child {..}

## All divs with a single p

    div p:only-child {..}

## Without siblings in its parent

    li:only-of-type {..}

## First children with a certain type

    x:first-of-type {..}

## Link

    a:link {..}

## Visited

    a:visited {..}

## Hover

    x:hover {..}
