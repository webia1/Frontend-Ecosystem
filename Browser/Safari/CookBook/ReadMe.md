 # Safari Cookbook

 ## Detect Safari via CSS

 ```css
@media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    .e-g-main {
      overflow: auto;
      -webkit-overflow-scrolling: auto;
    }
  }
}
 ```
