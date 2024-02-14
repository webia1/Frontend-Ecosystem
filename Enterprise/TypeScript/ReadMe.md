# Enterprise TypeScript (Experts only)

This document is aimed at professionals with solid TypeScript knowledge. The version at the time of writing this document is: **TypeScript v5.3.3**. Node must be installed on your system. I use Node v21.6.1 with Npm 10.4.0.

**Table of Contents**

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Preface](#preface)
- [Introduction](#introduction)
  - [TypeScript's Type System](#typescripts-type-system)
    - [Compile Time vs. Runtime](#compile-time-vs-runtime)
- [Setup & tsconfig.json](#setup--tsconfigjson)
- [Types](#types)
  - [Type Guards](#type-guards)

<!-- /code_chunk_output -->

## Preface

Here, I want to first address Types & special constructs because from time to time, I have colleagues who could write a doctoral thesis on Types, and I want to show how much simpler many things can function (and should).

If I find time, I'll add more topics. **I'm also open to suggestions and contributions.**

Even though some basic topics are covered, this document starts where other books end. That is, you will not read this information in any other book in this way.

This document will not find great acceptance in a TypeScript community, because here TypeScript is not the star, but rather **it is the way** one approaches Enterprise Architecture or Development while using TypeScript. No matter which framework you use, the disciplines here are transferable to many areas.

Since I want to address **TypeScript experts**, I have chosen the title accordingly. Anyone who masters these opinionated guidelines here, I might want to win over for our future projects.

Thus, you could correct me if I'm wrong, and if not, I might gain additional colleagues with whom I don't have to start from Adam and Eve when setting up projects.

While it's not necessarily the work I want to do every time, it is one of the very important foundational levels in the overall architecture, and if the foundation doesn't function properly, it's difficult to build upon it. I hope it doesn't sound arrogant, but at least this level of precision or understanding is what I expect. If someone offers higher precision than this, then it's even more desirable. My accuracy in this document should represent the minimum level.

The models that AIs generate, for example, are difficult for humans to understand. In the age of AI, where recurring processes can be handled much better and more efficiently by AIs and machines, we focus on models that are also comprehensible to humans. Here, we return to the foundation and want to carry out this work with meticulous precision.

And the TypeScript type system and beyond is exactly what we need for this use case.

## Introduction

**TypeScript** encompasses more than just coding; it's a toolkit for crafting robust enterprise applications. In this guide, I'll highlight key practices and tools for leveraging TypeScript's power in enterprise development. While we can't cover every detail here, I'll focus on crucial elements like Types, Decorators, Mixins, and Tools. You can find further details in the [official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### TypeScript's Type System

TypeScript's type system is the foundation of its power. We will cover this topic in detail in a separate chapter. For now, let's focus on the most important aspects.

#### Compile Time vs. Runtime

We need to emphasize the first distinction: **Compile time vs. Runtime**.

TypeScript's type system is defined as a compile-time feature, but in reality, it extends beyond that. This sentence alone will drive so many self-proclaimed TypeScript experts insane. :grin:

Types can indeed exist at runtime; for instance, **Enums** and **Classes** used as types would also exist at runtime. When utilized correctly, this is a powerful construct. Many books advise avoiding Enums, **but I respectfully disagree**, as elaborated further.

Also **Decorators** and **Mixins** are powerful constructs that exist at runtime, but no worries, I won't suggest using them as types, what indeed would be possible too.

Though this doesn't mean the type information itself exists at runtime but rather that these constructs have runtime representations, ultimately, it amounts to the same thing.

That's more of a philosophical discussion topic than a technical one. The fact is, you can use certain constructs as types at runtime. And these constructs have existed since earlier versions, offering both better flexibility and backward compatibility and they are crucial for reusability.  (Examples will follow).

That's for instance is a typical community response:

> It's correct that Enums, Classes, Decorators, and Mixins have runtime representations in JavaScript. However, saying that "types can indeed exist at runtime" might be misleading without clarification. Enums and Classes can be used as types in TypeScript and have corresponding runtime objects in JavaScript, but the TypeScript type information (like interface definitions) does not exist at runtime.

If I notice a TypeScript disciple is on the verge of a heart attack, I back off, after all, we don't want to make anyone sick or upset. :)

## Setup & tsconfig.json

When using a TypeScript-based framework like **Angular** or setting up **Nx** as Monorepo, these frameworks automatically create all the necessary configuration files during setup. However, if you want to start with Vanilla TypeScript, you have to take care of the setup yourself.

TypeScript-tooling can also assist you in automatically setting up a TypeScript environment:

```shell
# Install TypeScript globally if not already installed
npm i -g typescript

# Initialise a new TypeScript project
tsc --init

# Output:
Created a new tsconfig.json with:
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

```

After running the above commands, a `tsconfig.json` file will be created in the root directory. We need first of all a modern and strict configuration, so we have to update manually. ([See all details online](https://www.typescriptlang.org/tsconfig))

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "alwaysStrict": true,
    "baseUrl": ".",
    "declaration": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable", "ScriptHost"],
    "module": "ESNext",
    "moduleResolution": "node",
    "noImplicitAny": true,
    "noImplicitThis": true,
    "outDir": "./dist",
    "paths": {
      "@app/*": ["src/*"] // e.g.: import { MyClass } from '@app/my-class';
    },
    "rootDir": ".",
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "target": "es2016", // or "esnext"
  },

  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Some useful commands:

```shell
tsc --showConfig
tsc --listFiles
```

## Types

### Type Guards

A very simple example of a Type Guard (TypeScript 3.7 or later) is as follows:

```typescript
// TypeScript version 3.7 or later
function isString(value: any): value is string {
  return typeof value === 'string';
}
```
