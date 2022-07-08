# Browser Console

## Change Site's default font & bg-color via DevTools

```js
// an arbitrary example
let addStyle = document.createElement('style');
addStyle.innerHTML = `
  body, aside.blurb { font-family: "Georgia"; background-color: #6767676e}
  div#top-bar { display:none}
  `;
document.head.appendChild(addStyle);
```
