function resolveAfter(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

function timeout(ms, measuringPromise) {
  let timeoutID;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(Error(`Timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([somePromise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutID);
  });
}

const somePromise = resolveAfter(1000, 'Some Content');

timeout(2000, somePromise).then(
  (value) => console.log(value),
  (err) => console.warn(error.message),
);

// Output: Some Content
