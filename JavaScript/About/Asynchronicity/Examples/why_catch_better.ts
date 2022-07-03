const successHandlerX = () => {
  throw new Error('just throwing an error');
};

const errorHandlerX = (err: any) => console.log('Error: ', err);

// Error handler won't be executed
// const p3 = Promise.resolve();
// p3.then(successHandlerX, errorHandlerX);

// That will catch the error
const p4 = Promise.resolve();
p4.then(successHandlerX).catch(errorHandlerX);
