# Grid

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Further Reading](#further-reading)
- [Basic Principles](#basic-principles)
  - [Properties for the Grid Container](#properties-for-the-grid-container)
  - [Properties for Grid Items](#properties-for-grid-items)
- [Grid template](#grid-template)
  - [Columns/rows](#columnsrows)
    - [repeat](#repeat)
  - [Areas](#areas)
    - [Example](#example)
- [Gaps](#gaps)
- [`justify-items` - row axis](#justify-items-row-axis)
- [`align-items` - column axis](#align-items-column-axis)
- [`place-items` shorthand](#place-items-shorthand)
- [`justify-content` - Within the grid container](#justify-content-within-the-grid-container)
- [`align-content` - Within the grid container](#align-content-within-the-grid-container)
- [`place-content` shorthand](#place-content-shorthand)
- [Auto Columns/Rows](#auto-columnsrows)
  - [grid-auto-columns](#grid-auto-columns)
  - [grid-auto-rows](#grid-auto-rows)

<!-- /code_chunk_output -->

## Further Reading

See Cookbook [here](./Cookbook/ReadMe.md)

Complete Guide Grid:
<https://css-tricks.com/snippets/css/complete-guide-grid/>

Complete Guide Flex:
<https://css-tricks.com/snippets/css/a-guide-to-flexbox/>

## Basic Principles

- Container Element

  - `display: grid`
  - grid-template-columns and/or
  - grid-template-rows
  - grid-template-areas
  - ..

- Child Element
  - grid-area -..

### Properties for the Grid Container

- display
  - grid | inline-grid
  - sub-grid -> see <https://www.w3.org/TR/css-grid-2/#subgrids>
- grid-template-columns
- grid-template-rows
- grid-template-areas
- grid-template, a shorthand for
  - grid-template-rows
  - grid-template-columns
  - grid-template-areas
- grid-column-gap
- grid-row-gap
- grid-gap
- justify-items
- align-items
- place-items
- justify-content
- align-content
- place-content
- grid-auto-columns
- grid-auto-rows
- grid-auto-flow
- grid

### Properties for Grid Items

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end
- grid-column
- grid-row
- grid-area
- justify-self
- align-self
- place-self

## Grid template

Please notice `grid-template` is a shorthand for

- grid-template-rows
- grid-template-columns
- grid-template-areas

and since it **does not reset** the implicit grid properties like

- grid-auto-columns
- grid-auto-rows
- grid-auto-flow

better use the `grid` instead of `grid-template`.

### Columns/rows

```css
grid-template-columns:
grid template-rows:
  // for both, note the bracket syntax
  [row-or-columm1-name] track1-size [row-or-columm-n-name] track-n-size
```

#### repeat

```css
grid-template-columns: repeat(3, 1f); // = 1f 1f 1f
```

### Areas

```css
/* CONTAINER */
grid-template-areas:
  '<grid-area-name> | . | none | ...'
  '...';

/* ITEM X */

grid-area: <grid-area-name>;
```

#### Example

```css
.grid-level-0 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;
  grid-template-areas:
    'header header'
    'navigation content'
    'footer footer';
}

.header {
  grid-area: header;
}

.navigation {
  grid-area: navigation;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}
```

## Gaps

- `grid-gap` = `gap` = is a shorthand for:
  - `grid-row-gap` (OLD) = `row-gap` (NEW)
  - `grid-column-gap` (OLD) = `column-gap` (NEW)

## `justify-items` - row axis

`stretch` is default

```css
/* CONTAINER */
justify-items: start | end | center | stretch;
```

## `align-items` - column axis

`stretch` is default. See `baseline` example here:
<https://codepen.io/chriscoyier/pen/NWvvPRj>

```css
/* CONTAINER */
align-items: start | end | center | baseline | stretch;
```

## `place-items` shorthand

is a shorthand for `<align-items>` / `<justify-items>`

## `justify-content` - Within the grid container

<!-- prettier-ignore-start -->
```css
/* CONTAINER */
justify-content:
  start |
  end |
  center |
  stretch |
  space-around |
  space-between |
  space-evenly;
```
<!-- prettier-ignore-end -->

## `align-content` - Within the grid container

<!-- prettier-ignore-start -->
```css
/* CONTAINER */
 align-content:
   start |
   end |
   center |
   stretch |
   pace-around |
   space-between |
   space-evenly;
```
<!-- prettier-ignore-end -->

## `place-content` shorthand

is a shorthand for `align-content` and `justify-content`.

## Auto Columns/Rows

See this article first:
<https://css-tricks.com/difference-explicit-implicit-grids/>

### grid-auto-columns

### grid-auto-rows
