# SVG

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Introduction](#introduction)
   1. [Within HTML](#within-html)
   2. [Shapes](#shapes)
      1. [rect, circle, ellipse, line, polyline, polygon](#rect-circle-ellipse-line-polyline-polygon)
   3. [Path](#path)
      1. [`moveto command`](#moveto-command)
      2. [`closepath command`](#closepath-command)
      3. [`lineto command`](#lineto-command)
      4. [`cubic Bézier curve command`](#cubic-bézier-curve-command)
      5. [`quadratic Bézier curve command`](#quadratic-bézier-curve-command)
      6. [`elliptical arc curve command`](#elliptical-arc-curve-command)
      7. [The grammar for path data](#the-grammar-for-path-data)
   4. [Text](#text)
   5. [Presentational Attributes](#presentational-attributes)
   6. [Color](#color)
   7. [Transformations](#transformations)
   8. [Structural Elements and Document Organization](#structural-elements-and-document-organization)
   9. [Coordinating, Scaling, Rendering](#coordinating-scaling-rendering)
   10. [SVG and CSS](#svg-and-css)
   11. [Accessibility](#accessibility)
   12. [Further Reading](#further-reading)

<!-- /code_chunk_output -->

## Introduction

> Details online: <https://svgwg.org/svg2-draft/intro.html>

- Two-dimensional
- Support of interactivity and animation
- XML-based
- Produces DOM-Tree (not a canvas-like image)
- `Renderable Graphic Elements`
  - Such as basic shapes, text elements, lines and curves
    - controlled by `presentational attributes`
      - size, position, color etc.
- `Structural Elements`
  - are used to organize information within an SVG document
    - grouping, reusing, etc.
- Transformations
  - translate, rotate, stretch etc.
- Rendered in document order,
  - the later ones occlude previous ones
- SVG uses `graphical coordinates`
  - from left top running `downward`
  - Positions and sizes
    - measured in dimensionless user coordinates
  - Absolute size is determined by the rendering device
- SVG Documents can receive `user events`
  - and invoke corresponding `event handlers`

### Within HTML

- `<svg>...</svg>`
- `<img src="mySVGFile.svg" />`
  - If so, SVG Namespace Declaration required:

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
>...</svg>
```

### Shapes

> Details online: <https://svgwg.org/svg2-draft/shapes.html>

#### rect, circle, ellipse, line, polyline, polygon

```svg
   <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1090"
    >
      <rect
        x="10"
        y="10"
        width="300"
        height="300"
        fill="yellowgreen"
        stroke="blue"
        stroke-width="2"
      />

      <g transform="translate(150 150) rotate(-30)">
        <rect
          x="0"
          y="0"
          width="300"
          height="300"
          rx="50"
          fill="none"
          stroke="purple"
          stroke-width="10"
        />
      </g>

      <circle
        cx="150"
        cy="150"
        r="100"
        fill="red"
        stroke="blue"
        stroke-width="10"
      />

      <g transform="translate(300 150)">
        <ellipse rx="150" ry="100" fill="green" />
      </g>

      <ellipse
        transform="translate(400 150) rotate(-30)"
        rx="150"
        ry="100"
        fill="none"
        stroke="darkorange"
        stroke-width="20"
      />

      <g stroke="black">
        <line x1="100" y1="300" x2="300" y2="100" stroke-width="10" />
        <line x1="300" y1="300" x2="500" y2="100" stroke-width="30" />
        <line x1="500" y1="300" x2="700" y2="100" stroke-width="60" />
      </g>

      <polyline
        fill="yellow"
        stroke="blue"
        stroke-width="10"
        points="50,375
              150,375 150,325 250,325 250,375
              350,375 350,250 450,250 450,375
              550,375 550,175 650,175 650,375
              750,375 750,100 850,100 850,375
              950,375 950,25 1050,25 1050,375
              1150,375"
      />
      <g transform="translate(200 150)">
        <polygon
          fill="orange"
          stroke="purple"
          stroke-width="10"
          points="350,75  379,161 469,161 397,215
                    423,301 350,250 277,301 303,215
                    231,161 321,161"
        />
      </g>

      <g transform="translate(0 150) rotate(10)">
        <polygon
          fill="orange"
          stroke="purple"
          stroke-width="10"
          points="850,75  958,137.5 958,262.5
                    850,325 742,262.6 742,137.5"
        />
      </g>
    </svg>
```

### Path

> Details online: <https://svgwg.org/svg2-draft/paths.html>

```svg
<svg
  viewBox="0 0 1920 1090"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
>
  <title>Example triangle01- simple example of a 'path'</title>
  <desc>A path that draws a triangle</desc>
  <path
    d="M 100 100 L 300 100 L 200 300 z"
    fill="red"
    stroke="blue"
    stroke-width="3"
  />
</svg>
```

#### `moveto command`

#### `closepath command`

#### `lineto command`

#### `cubic Bézier curve command`

#### `quadratic Bézier curve command`

#### `elliptical arc curve command`

#### The grammar for path data

### Text

> Details online: https://svgwg.org/svg2-draft/text.html

### Presentational Attributes

### Color

### Transformations

### Structural Elements and Document Organization

### Coordinating, Scaling, Rendering

### SVG and CSS

### Accessibility

> Details online: <https://svgwg.org/svg2-draft/access.html>

### Further Reading
