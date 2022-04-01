# Asynchronous JS

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [About](#about)
- [Callbacks](#callbacks)
  - [Basics with an example](#basics-with-an-example)
  - [Promises](#promises)
    - [Basics](#basics)
    - [Chaining](#chaining)
    - [Concurent Promises](#concurent-promises)

<!-- /code_chunk_output -->

## About

- Custom iterators & using a generator function as a short-cut to create iterators
- Promises & Async/Await

## Callbacks

The main benefit of using callbacks is that the program can continue doing useful work while performing other tasks.

Perhaps the simplest asynchronous execution in JavaScript is the `setTimeOut()` function. This function defines a callback function that will be executed in the future independently of the main program flow, i.e. it will not block the execution of the program.

Callbacks are still useful when your code may be notified multiple times. For example, the `setInterval()` method defines a callback function that runs repeatedly, with a fixed time delay between each invocation. **After a promise is executed, it cannot be called again, but the callback function can be called multiple times.**

### Basics with an example

```ts
type GreeterCallbackType = (greetingsFor: string) => void;

function greet(msg: string, callback: GreeterCallbackType) {
  callback(msg);
}

greet('How are you', greetMaxCallback);
greet('How are you', greetJohnCallback);

function greetMaxCallback(msg: string) {
  setTimeout(() => {
    console.log(msg, 'Max');
  }, 300);
}

function greetJohnCallback(msg: string) {
  setTimeout(() => {
    console.log(msg, 'John');
  }, 100);
}

/**
 * Output:
 * How are you John
 * How are you Max
 */
```

### Promises

[Source: Excerpt from MozillaDev.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

A [`Promise`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the eventual completion or failure of an asynchronous operation. Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function. One of the great things about using promises is **chaining**.

#### Basics

The static `Promise.resolve()` and `Promise.reject()` methods allow you to rapidly create settled promises and evaluate how the function behaves when a different value is passed in.

```ts
const p1 = Promise.resolve('Michael Jackson');
const p2 = Promise.reject('Michael Mayr');

p1.then((res) => console.log(res)); // Michael Jackson
p2.then(null, (err) => console.log(err)); // Michael Mayr

// Basic construction: promise.then(fulfillment_handler, reject_handler);
```

better use `catch`. In the following example `then()` would not work and would output `Uncaught (in promise) Error`:

```ts
const promise = Promise.resolve();

promise
  .then(() => {
    throw new Error('just throwing an error');
  })
  .catch((error) => {
    console.error(error);
  });

// [Error: just throwing an error]
```

#### Chaining

```ts
function doSomething(): Promise<string> {
  return Promise.resolve('I do something');
}

function successCallback(something: string) {
  return something;
}

function failureCallback(error: Error) {
  return error;
}

const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

promise2.then((some) => console.log(some)); // I do something
```

#### Concurent Promises

An overview: Existing methods.

- ES2015
  - Promise.all()
  - Promise.race()
- ES2020/21
  - Promise.allSettled()
  - Promise.any()
- Since existing
  - Promise.reject()
  - Promise.resolve()
  - Promise.prototype.catch()
  - Promise.prototype.finally()
  - Promise.prototype.then()
