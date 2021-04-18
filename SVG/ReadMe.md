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
   11. [Further Reading - svgwg.org](#further-reading-svgwgorg)
       1. [Chapter 1: Introduction](#chapter-1-introduction)
       2. [Chapter 2: Conformance Criteria](#chapter-2-conformance-criteria)
       3. [Chapter 3: Rendering Model](#chapter-3-rendering-model)
       4. [Chapter 4: Basic Data Types and Interfaces](#chapter-4-basic-data-types-and-interfaces)
       5. [Chapter 5: Document Structure](#chapter-5-document-structure)
       6. [Chapter 6: Styling](#chapter-6-styling)
       7. [Chapter 7: Geometry Properties](#chapter-7-geometry-properties)
       8. [Chapter 8: Coordinate Systems, Transformations and Units](#chapter-8-coordinate-systems-transformations-and-units)
       9. [Chapter 9: Paths](#chapter-9-paths)
       10. [Chapter 10: Basic Shapes](#chapter-10-basic-shapes)
       11. [Chapter 11: Text](#chapter-11-text)
       12. [Chapter 12: Embedded Content](#chapter-12-embedded-content)
       13. [Chapter 13: Painting: Filling, Stroking and Marker Symbols](#chapter-13-painting-filling-stroking-and-marker-symbols)
       14. [Chapter 14: Paint Servers: Gradients and Patterns](#chapter-14-paint-servers-gradients-and-patterns)
       15. [Chapter 15: Scripting and Interactivity](#chapter-15-scripting-and-interactivity)
       16. [Chapter 16: Linking](#chapter-16-linking)
       17. [Appendix A: IDL Definitions](#appendix-a-idl-definitions)
       18. [Appendix B: Implementation Notes](#appendix-b-implementation-notes)
       19. [Appendix C: Accessibility Support](#appendix-c-accessibility-support)
       20. [Appendix D: Animating SVG Documents](#appendix-d-animating-svg-documents)
       21. [Appendix F: Element Index](#appendix-f-element-index)
       22. [Appendix G: Attribute Index](#appendix-g-attribute-index)
       23. [Appendix H: Property Index](#appendix-h-property-index)
       24. [Appendix I: IDL Index](#appendix-i-idl-index)
       25. [Appendix J: Media Type Registration for image/svg+xml](#appendix-j-media-type-registration-for-imagesvgxml)
       26. [Appendix K: Changes from SVG 1.1](#appendix-k-changes-from-svg-11)

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

### Further Reading - svgwg.org

#### Chapter 1: Introduction

<https://svgwg.org/svg2-draft/intro.html>

#### Chapter 2: Conformance Criteria

<https://svgwg.org/svg2-draft/conform.html>

#### Chapter 3: Rendering Model

<https://svgwg.org/svg2-draft/render.html>

#### Chapter 4: Basic Data Types and Interfaces

<https://svgwg.org/svg2-draft/types.html>

#### Chapter 5: Document Structure

<https://svgwg.org/svg2-draft/struct.html>

#### Chapter 6: Styling

<https://svgwg.org/svg2-draft/styling.html>

#### Chapter 7: Geometry Properties

<https://svgwg.org/svg2-draft/geometry.html>

#### Chapter 8: Coordinate Systems, Transformations and Units

<https://svgwg.org/svg2-draft/coords.html>

#### Chapter 9: Paths

<https://svgwg.org/svg2-draft/paths.html>

#### Chapter 10: Basic Shapes

<https://svgwg.org/svg2-draft/shapes.html>

#### Chapter 11: Text

<https://svgwg.org/svg2-draft/text.html>

#### Chapter 12: Embedded Content

<https://svgwg.org/svg2-draft/embedded.html>

#### Chapter 13: Painting: Filling, Stroking and Marker Symbols

<https://svgwg.org/svg2-draft/painting.html>

#### Chapter 14: Paint Servers: Gradients and Patterns

<https://svgwg.org/svg2-draft/pservers.html>

#### Chapter 15: Scripting and Interactivity

<https://svgwg.org/svg2-draft/interact.html>

#### Chapter 16: Linking

<https://svgwg.org/svg2-draft/linking.html>

#### Appendix A: IDL Definitions

<https://svgwg.org/svg2-draft/idl.html>

#### Appendix B: Implementation Notes

<https://svgwg.org/svg2-draft/implnote.html>

#### Appendix C: Accessibility Support

<https://svgwg.org/svg2-draft/access.html>

#### Appendix D: Animating SVG Documents

> Overview: <https://svgwg.org/svg2-draft/animate.html>
> Details: <https://svgwg.org/specs/animations/>

#### Appendix F: Element Index

<https://svgwg.org/svg2-draft/eltindex.html>

#### Appendix G: Attribute Index

<https://svgwg.org/svg2-draft/attindex.html>

#### Appendix H: Property Index

<https://svgwg.org/svg2-draft/propidx.html>

#### Appendix I: IDL Index

<https://svgwg.org/svg2-draft/idlindex.html>

#### Appendix J: Media Type Registration for image/svg+xml

<https://svgwg.org/svg2-draft/mimereg.html>

#### Appendix K: Changes from SVG 1.1

<https://svgwg.org/svg2-draft/changes.html>
