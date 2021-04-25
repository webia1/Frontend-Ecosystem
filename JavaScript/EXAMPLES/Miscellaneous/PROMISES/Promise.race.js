function resolveAfter(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

const pA = resolveAfter(1000, 'A');
const pB = resolveAfter(2000, 'B');

const fastestPromise = Promise.race([pA, pB]);

console.log(fastestPromise);

fastestPromise.then((value) => {
  console.log('Value: ', value);
});

// Ouput:
// Promise { <pending> }
// Value:  A
