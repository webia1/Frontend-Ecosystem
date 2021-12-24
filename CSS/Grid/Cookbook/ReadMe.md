# Grid

## Example Code

Those I forget more easly:

## `minmax` `min-content`, `max-content`

<!-- prettier-ignore-start -->
```css
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns:
    minmax (min-content, 1fr)
    minmax (max-content, 1fr);
}
```
<!-- prettier-ignore-end -->

## `grid-template-areas`

<!-- prettier-ignore-start -->
```css
.container {
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

@media (max-width: 600px) {
  .grid-level-0 {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'navigation'
      'content'
      'footer';
    grid-template-rows: auto;
  }

  .grid-level-1 {
    grid-template-rows: 1fr;
  }

  .box {
    background-color: yellowgreen !important;
    color: blueviolet;
  }
}
```
<!-- prettier-ignore-end -->

## `auto-flow`

```css
.container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
```

## `repeat`

```css
.container {
  display: grid;
  grid-template-columns: repeat(
    1,
    minmax(120px, 1fr) minmax(240px, 1fr)
  );
  grid-gap: 10px;
}
```

## `repeat -> auto-fit`

<!-- prettier-ignore-start -->
```css
.container {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(480px, 1fr));
  grid-gap: 10px;
}
```
<!-- prettier-ignore-end -->

## named columns

<!-- prettier-ignore-start -->

```css
.container {
  display: grid;
  grid-gap: 10px;
  height: 100vh;
  grid-template-columns:
    [start]
    repeat(2,
      [col-sml-start] minmax(20px, auto)
      [col-sml-end col-lrg-start] minmax(90px, auto)
      [col-lrg-end]
    ) [end]
}
```
<!-- prettier-ignore-end -->

## auto-fill & auto-fit

`auto-fit` fills empty space

<!-- prettier-ignore-start -->
```css
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns:
    repeat(auto-fit, minmax(288px, 1fr));
}


.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns:
    repeat(auto-fill, minmax(288px, 1fr));
}

```

<!-- prettier-ignore-end -->

## dense

`dense` (dicht) fills the emtpy space with a grid box, if available.

```css
grid-auto-flow: column dense;
```

## auto-rows

Example: First two rows have the dimensions: `1fr` and `2fr` and all
others `1fr`:

<!-- prettier-ignore-start -->
```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr 2fr;
  grid-auto-rows: 1fr;
  grid-template-columns:
    repeat(auto-fill, minmax(288px, auto));
}
```
<!-- prettier-ignore-end -->

## order rows

Third element at the top:

```css
.grid-box:nth-of-type(3) {
  /* standard order of all boxes in HTML-DOM is 0 */
  order: -1  /* OR */
  grid-row: 1  /* NOT BOTH , order OR grid-row */
}
```

# short hand start/end

Short hand for `grid-column-start` and `grid-column-end`. (The samle
applies `grid-row` too.)

```css
grid-column: 4 / span 2;
```
