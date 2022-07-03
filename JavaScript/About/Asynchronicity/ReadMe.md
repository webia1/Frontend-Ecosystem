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
    - [Overview: Existing methods](#overview-existing-methods)
    - [Promise.all(iterable)](#promisealliterable)
    - [Promise.allSettled()](#promiseallsettled)
    - [Promise.race()](#promiserace)
    - [Promise.any](#promiseany)

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

**Better use `catch`. **

Study the following example:

```ts
const successHandlerX = () => {
  throw new Error('just throwing an error');
};

const errorHandlerX = (err: any) => console.log('Error: ', err);

// Error handler won't be executed
const p3 = Promise.resolve();
p3.then(successHandlerX, errorHandlerX);

// That will catch the error
const p4 = Promise.resolve();
p4.then(successHandlerX).catch(errorHandlerX);
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

### Concurent Promises

#### Overview: Existing methods

```shell
- ES2015
  - Promise.all()             # one rejects, or all fullfills
  - Promise.race()            # one of: rejects or fullfills
- ES2020/21
  - Promise.allSettled()      # all fulfills or rejects
  - Promise.any()             # one of: fullfills, but
                                # if all rejects: AggregateError
- Since existing
  - Promise.reject()
  - Promise.resolve()
  - Promise.prototype.catch()
  - Promise.prototype.finally()
  - Promise.prototype.then()
```

#### Promise.all(iterable)

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

Please study the following example: If one of them rejects:

```ts
const errorHandler = (err: any) => console.log('Error: ', err);

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, _reject) => {
  setTimeout(resolve, 100, 'foo');
});
const p4 = Promise.reject(3);

Promise.all([promise1, promise2, promise3, p4])
  .then((values) => {
    console.log(values);
  })
  .catch(errorHandler);

// Error: 3
```

If you want to get all results, whether they resolve or reject, use `Promise.allSettled`. See next chapter below.

#### Promise.allSettled()

The **`Promise.allSettled()`** method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.

```ts
namespace PromiseAllSettled {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  const p4 = Promise.reject(3);

  Promise.allSettled([promise1, promise2, promise3, p4])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}
```

Outputs:

```json
[
  { "status": "fulfilled", "value": 3 },
  { "status": "fulfilled", "value": 42 },
  { "status": "fulfilled", "value": "foo" },
  { "status": "rejected", "reason": 3 }
]
```

#### Promise.race()

The **`Promise.race()`** method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

```ts
namespace PromiseRace1 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P1 resolve');
  });
  const promise2 = Promise.resolve('P2 resolve');
  const promise3 = Promise.reject('P3 reject');

  Promise.race([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P2 resolve

namespace PromiseRace2 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P1 resolve');
  });
  const promise2 = Promise.reject('P2 reject');
  const promise3 = Promise.resolve('P3 resolve');

  Promise.race([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// Error:  P2 reject
```

#### Promise.any

`Promise.any()` takes an iterable of [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects. It returns a single promise that resolves as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError), a new subclass of [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) that groups together individual errors.

```ts
namespace PromiseAny1 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve('P1 resolve');
  const promise2 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P2 Foo');
  });
  const promise3 = Promise.reject('P3 reject');

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P1 resolve

namespace PromiseAny2 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.resolve('P2 resolve');
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P3 Foo');
  });

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P2 resolve

namespace PromiseAny3 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.reject('P2 reject');
  const promise3 = new Promise((_resolve, reject) => {
    setTimeout(reject, 100, 'P3 reject');
  });

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// Error:  [AggregateError: All promises were rejected]

namespace PromiseAny4 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.reject('P2 reject');
  const promise3 = new Promise((_resolve, reject) => {
    setTimeout(reject, 100, 'P3 reject');
  });
  const promise4 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 200, 'P4 resolve');
  });

  Promise.any([promise1, promise2, promise3, promise4])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P4 resolve
```
