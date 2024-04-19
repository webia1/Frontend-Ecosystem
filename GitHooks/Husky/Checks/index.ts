const fsHusky = require('fs');
const exec = require('child_process').exec;

const currentProjectHooks = ['pre-commit', 'pre-push'];

const huskyExecutablesFolder = './.husky/_';

function checkIfHuskyExistsAndNotEmpty() {
  return new Promise(function (resolve) {
    fsHusky.readdir(huskyExecutablesFolder, function (err, files) {
      if (err) {
        console.log('Husky Folder not found');
        resolve(false);
      } else if (files.length === 0) {
        console.log('Husky Folder is empty');
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function checkCustomHooks(hook) {
  return new Promise(function (resolve) {
    fsHusky.access(
      '.husky/' + hook,
      fsHusky.constants.F_OK,
      function (err) {
        if (err) {
          console.log('Husky Hook not found:', hook);
          resolve(false);
        } else {
          resolve(true);
        }
      },
    );
  });
}

function activateHusky() {
  exec('npx husky', function (error) {
    if (error) {
      console.error('Error Activating Husky:', error);
      console.warn('You may need to execute `npm i`.');
    } else {
      console.log('Husky Hooks are present.');
    }
  });
}

Promise.all([
  ...currentProjectHooks.map(checkCustomHooks),
  checkIfHuskyExistsAndNotEmpty(),
]).then(function (results) {
  if (results.includes(false)) {
    console.log(
      'That should never happen: Custom Husky Hooks are missing or Husky folder is not set up correctly!',
    );
    console.log('Please inform the architecture team.');
  } else {
    console.log(
      'All checks passed: Custom Husky Hooks and Husky folder are correctly set up.',
    );
  }
});
