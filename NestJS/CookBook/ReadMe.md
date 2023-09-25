# NestJS CookBook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx Setup](#nx-setup)

<!-- /code_chunk_output -->

## Nx Setup

Create a new NestJS project within a NxMonoRepo via Nx Console:

```bash
npm i -D @nx/nest
npx nx generate @nx/nest:application
  --name=middleware-basis-app
  --frontendProject=basis-app
  --directory=apps/basis/middleware-basis-app
  --projectNameAndRootFormat=as-provided
  --tags=middleware-basis-app
  --no-interactive
  # --dry-run
```
