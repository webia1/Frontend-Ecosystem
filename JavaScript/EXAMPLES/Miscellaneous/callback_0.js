function greeting() {
  console.log("Welcome!");
}

function doWhateverItIs(callback) {
  if (typeof callback === 'function') {
    callback();
  }
}

doWhateverItIs(greeting);