# CSS(3) Cook Book

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Google Fonts (Angular & Co.)](#google-fonts-angular-co)
- [Background Image (Color Linear Gradient)](#background-image-color-linear-gradient)
- [Using OK sign (&#10004;)](#using-ok-sign-10004)
- [Working with Text in Scalable Vector Graphics (SVG)](#working-with-text-in-scalable-vector-graphics-svg)
- [Breaking Words and Lines](#breaking-words-and-lines)
- [Hypens (Bindestriche-Silbentrennung) & Breakpoints](#hypens-bindestriche-silbentrennung-breakpoints)
- [Styling `hr`](#styling-hr)
- [Min Font Size](#min-font-size)
- [Simple TypeWriter Animation](#simple-typewriter-animation)
- [Rotating an Image](#rotating-an-image)
- [Defining Style Within Angular Template](#defining-style-within-angular-template)

<!-- /code_chunk_output -->

## Google Fonts (Angular & Co.)

> See [Google Fonts Helper -> Example: EB Garamond](https://google-webfonts-helper.herokuapp.com/fonts/eb-garamond?subsets=latin)

1. Download Fonts into e.g. assets/fonts/eb-garamond/.. (use the link above)
2. Create a File e.g. assets/scss/fonts.scss and integrate font

```scss
@font-face {
  font-family: 'EB Garamond';
  font-style: normal;
  font-weight: 700;
  src: url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.eot'); /* IE9 Compat Modes */
  src: local(''),
    url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.eot?#iefix')
      format('embedded-opentype'), /* IE6-IE8 */
      url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.woff2')
      format('woff2'),
    /* Super Modern Browsers */
      url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.woff')
      format('woff'), /* Modern Browsers */
      url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.ttf')
      format('truetype'),
    /* Safari, Android, iOS */
      url('/assets/fonts/eb-garamond/eb-garamond-v14-latin-700.svg#EBGaramond')
      format('svg'); /* Legacy iOS */
}
```

3. import into style.css

```scss
@import 'assets/scss/fonts.scss';
```

4. Use it e.g.

```scss
.cTitle1 {
  font-family: 'EB Garamond';
  font-size: 2rem;
}
```

## Background Image (Color Linear Gradient)

```css
background-image: linear-gradient(
  to bottom right,
  #31388d 0%,
  #753fa9 30%,
  #ff0762 60%,
  #f25632 100%
);
```

## Using OK sign (&#10004;)

`HTML: &#10004; CSS content="\2714"`

Link1: https://www.toptal.com/designers/htmlarrows/symbols/heavy-check-mark/

Link2: https://stackoverflow.com/questions/9963576/ok-or-accepted-symbol-in-html

## Working with Text in Scalable Vector Graphics (SVG)

[>> Here](https://www.hongkiat.com/blog/scalable-vector-graphics-text/)

## Breaking Words and Lines

[Here is a long explanation](https://css-tricks.com/where-lines-break-is-complicated-heres-all-the-related-css-and-html/) and an excerpt here:

The `&shy;` character is just like the `<wbr>` element. You can inject a line break via pseudo-element like `::before { content: "\A"; }` as long as the element isn’t inline (or if it is, it needs white-space: pre;)

## Hypens (Bindestriche-Silbentrennung) & Breakpoints

[css-tricks.com &rarr; hypens](https://css-tricks.com/almanac/properties/h/hyphenate/)

The hyphens property controls hyphenation of text in block level elements.

## Styling `hr`

[Link: CSS Tricks](https://css-tricks.com/examples/hrs/)

An Excerpt:

```css
hr.style-one {
  width: 100%;
  border: 0;
  height: 2px;
  background-image: linear-gradient(
    to right,
    rgba($gray, 0),
    rgba($gray, 0.85),
    rgba($gray, 0)
  );
}

/* Inset, by Dan Eden */

hr.style-six {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
```

## Min Font Size

[One of the answers at StackOverflow, below an excerpt,..](https://stackoverflow.com/a/61892360/3025289)

```
h1{
    font-size: 10vw; /* Browsers that do not support "MIN () - MAX ()" and "Clamp ()" functions will take this value.*/
    font-size: max(100px, min(10vw, 150px)); /* Browsers that do not support the "clamp ()" function will take this value. */
    font-size: clamp(100px, 10vw, 150px);
}
```

## Simple TypeWriter Animation

```css
.cTypeWriter {
  position: relative;
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
}

.cTypeWriterAnim {
  animation: typing 1s 0.3s steps(100) infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 400px;
  }
}
```

## Rotating an Image

```css
.myAppLogo {
  height: 10vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .myAppLogo {
    animation: myAppLogoSpin infinite 10s linear;
  }
}

@keyframes myAppLogoSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Defining Style Within Angular Template

Please note:

- `<style>`
- `:host {...}`
- `font-family: -apple-system,...` &rarr; "Normalizing"
  - See <https://github.com/necolas/normalize.css/issues/665>

Source Code:

```html
<style>
  :host {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
```
