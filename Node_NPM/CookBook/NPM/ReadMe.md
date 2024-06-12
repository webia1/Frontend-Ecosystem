# NPM CookBook

## Checking if a package does have type definitions

```bash
npm view <package-name> types
# e.g.
npm view jsqr types  # returns ./dist/index.d.ts

```

## Checking Licenses

```bash
npm i -g license-checker
license-checker --summary --production
```
