# TypeScript Types

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Everyday Types](#everyday-types)
  - [The primitives](#the-primitives)
    - [string](#string)
    - [number](#number)
    - [boolean](#boolean)
  - [Arrays](#arrays)
  - [any](#any)
  - [Functions](#functions)
  - [Object Types](#object-types)
  - [Union Types](#union-types)
  - [Interfaces](#interfaces)
    - [Interfaces vs Types](#interfaces-vs-types)
      - [Extending](#extending)
        - [Interface](#interface)
        - [Type](#type)
      - [Adding New Fields](#adding-new-fields)
        - [Interface](#interface-1)
        - [Type](#type-1)
  - [Type Assertions](#type-assertions)
  - [Literal Inference Issue](#literal-inference-issue)
  - [`null` and `undefined`](#null-and-undefined)
    - [strictNullChecks off](#strictnullchecks-off)
    - [strictNullChecks on](#strictnullchecks-on)
    - [Non-null Assertion Operator (Postfix `!`)](#non-null-assertion-operator-postfix)
  - [Enums](#enums)
- [Creating Types from Types](#creating-types-from-types)
  - [Generics](#generics)
    - [Generic Constraints](#generic-constraints)
    - [Using Type Parameters in Generic Constraints](#using-type-parameters-in-generic-constraints)
    - [Using Class Types in Generics](#using-class-types-in-generics)
      - [Mixins](#mixins)
  - [`keyof` Type Operator](#keyof-type-operator)
  - [Typeof Type Operator](#typeof-type-operator)
  - [Indexed Access Types](#indexed-access-types)

<!-- /code_chunk_output -->

## Everyday Types

### The primitives

#### string

#### number

#### boolean

### Arrays

```ts
const arr: Array<string> = ['s', 't'];
```

### any

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit any as an error.

### Functions

```ts
function greetMe(name: string): string {
  return `Hi ${name}!`;
}
```

### Object Types

```ts
// The parameter's type annotation is an object type
function printC(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printC({ x: 3, y: 7 });
```

or better:

```ts
type Point = {
  x: number;
  y: number;
};

function printC(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printC({ x: 3, y: 7 });
```

### Union Types

```ts
type Id = number | string; // <-- Id is a union type

function getId(id: Id): string {
  return String(id);
}

typeof getId(4); // string
```

Numeric literal types work the same way:

```ts
type OneOf = -1 | 0 | 1;
function compare(a: string, b: string): OneOf {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

### Interfaces

> Tip: You don't have to repeat prop-names within the class, it they have the same name:

```ts
interface SomeClass {
  propOne: string;
  propTwo: number;
}
class SomeClass {
  constructor(one: string, two: number) {
    this.propOne = one;
    this.propTwo = two;
  }
}
```

#### Interfaces vs Types

##### Extending

###### Interface

```ts
interface Mammal {
  name: string;
}

interface Human extends Mammal {
  brain: boolean;
}
```

###### Type

```ts
type Mammal = {
  name: string;
};

type Human = Mammal & {
  brain: boolean;
};
```

##### Adding New Fields

###### Interface

```ts
interface Human {
  kind: string;
}

interface Human {
  brain: boolean;
}

class Human implements Human {
  constructor() {
    this.kind = 'Homo Sapiens';
    this.brain = true; // hopefully
  }
}

let h = new Human();
// Human { kind: 'Homo Sapiens', brain: true }
```

###### Type

A type cannot be changed after being created

### Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more specific type:

```ts
const myCanvas = document.getElementById(
  'main_canvas',
) as HTMLCanvasElement;
```

You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

```ts
const myCanvas = <HTMLCanvasElement>(
  document.getElementById('main_canvas')
);
```

### Literal Inference Issue

```ts
const req = { url: 'https://example.com', method: 'GET' };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable
// to parameter of type '"GET" | "POST"'.
```

There are two ways to work around this.

1. You can change the inference by adding a type assertion in either location:

```ts
// Change 1:
const req = { url: 'https://example.com', method: 'GET' as 'GET' };
// Change 2
handleRequest(req.url, req.method as 'GET');
```

2. You can use as const to convert the entire object to be type literals:

```ts
const req = { url: 'https://example.com', method: 'GET' } as const;
handleRequest(req.url, req.method);
```

### `null` and `undefined`

JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.

TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the `strictNullChecks` option on.

#### strictNullChecks off

With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type. This is similar to how languages without `null` checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn `strictNullChecks` on if it’s practical to do so in their codebase.

#### strictNullChecks on

With `strictNullChecks` on, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value. Just like checking for `undefined` before using an optional property, we can use narrowing to check for values that might be `null`:

```ts
function doSomething(x: string | undefined) {
  if (x === undefined) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
```

#### Non-null Assertion Operator (Postfix `!`)

TypeScript also has a special syntax for removing `null` and `undefined` from a type without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`:

```ts
function liveDangerously(x?: number | undefined) {
  // I know x will be always a number, hopefully
  console.log(x!.toFixed());
}
```

### Enums

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;
```

## Creating Types from Types

### Generics

`<T>` is a kind of placeholder, you can write anything there like `<WhatEver>`:

```ts
function identity<T>(arg: T): T {
  return arg;
}
let outputString = identity<string>('myString'); //?
let outputNumber = identity<number>(2); //?
```

#### Generic Constraints

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3); // <-- ERROR
// Argument of type 'number' is not assignable
// to parameter of type 'Lengthwise'.ts(2345)

loggingIdentity({ length: 7 }); // OK
loggingIdentity({ length: 10, value: 3 }); // OK
```

#### Using Type Parameters in Generic Constraints

```ts
function getProperty<Type, Key extends keyof Type>(
  obj: Type,
  key: Key,
) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a'); // OK --> 1
getProperty(x, 'm'); // ERROR
// Argument of type '"m"' is not assignable to
// parameter of type '"a" | "b" | "c" | "d"'.ts(2345)
```

#### Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example:

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

##### Mixins

A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types. (This pattern is used to power the [`mixins`](https://www.typescriptlang.org/docs/handbook/mixins.html) design pattern.)

```ts
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

### `keyof` Type Operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys:

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```

If the type has a string or number index signature, keyof will return those types instead:

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
//   ^ = type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
//   ^ = type M = string | number
```

Note that in this example, `M` is `string | number` — this is because JavaScript object keys are always coerced to a string, so `obj[0]` is always the same as `obj["0"]`.

keyof types become especially useful when combined with mapped types, which we’ll learn more about later.

### Typeof Type Operator

```ts
type WhatEverType = {
  x: number;
  y: number;
};

type Predicate = (x: unknown) => WhatEverType;

// predefined type ReturnType<T>
type K = ReturnType<Predicate>;

/*
type K = {
    x: number;
    y: number;
}
*/
```

If we try to use ReturnType on a function name, we see an instructive error:

```ts
type WhatEverType = {
  x: number;
  y: number;
};

function f(): WhatEverType {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>; // ERROR
// 'f' refers to a value, but is being used as a type here.
// Did you mean 'typeof f'?

type T = ReturnType<typeof f>; // OK

/*
  type T = {
      x: number;
      y: number;
  }
  */
```

### Indexed Access Types

TODO: Proceeding here -> <https://www.typescriptlang.org/docs/handbook/2/types-from-types.html>

Overview here: <https://www.typescriptlang.org/docs/>
