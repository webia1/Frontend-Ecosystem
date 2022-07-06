import assert from 'assert/strict';

function* gen() {
  yield 'a';
  yield 'b';
}

const iterator = gen();
assert.deepEqual(Array.from(iterator), ['a', 'b']);

console.log(iterator.next(), iterator.next(), iterator.next());

/**
 * {value: 'a', done: false}
 * {value: 'b', done: false}
 * {value: undefined, done: true}
 */
