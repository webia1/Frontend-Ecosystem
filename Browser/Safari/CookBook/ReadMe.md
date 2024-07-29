 # Safari Cookbook

 ## Detect Safati via CSS

 ```css
@media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    .main {
      overflow: auto;
      -webkit-overflow-scrolling: auto;
    }
  }
}
 ```
