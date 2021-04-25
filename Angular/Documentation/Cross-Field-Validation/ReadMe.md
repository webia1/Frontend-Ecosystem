# Angular Cross Field Validation

> [Great Answer here (StackOverflow), old but still valid.](https://stackoverflow.com/questions/31788681/angular2-validator-which-relies-on-multiple-form-fields)
> Full Example: [https://embed.plnkr.co/ukwCXm/](https://embed.plnkr.co/ukwCXm/)

> [Another Example is here](https://dzone.com/articles/how-to-do-conditional-validation-on-valuechanges-m)

In order for Validators to take parameters, they need to return a function with either a FormGroup or FormControl as a parameter.
In this case, I'm validating a FormGroup.

```ts
function matchingPasswords(
  passwordKey: string,
  confirmPasswordKey: string,
) {
  return (group: FormGroup): { [key: string]: any } => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true,
      };
    }
  };
}
```

Dave's answer was very, very helpful. However, a slight modification might help some people.

In case you need to add errors to the Control fields, you can keep the actual construction of the form and validators:

```ts
// Example use of FormBuilder, ControlGroups, and Controls
this.registrationForm = fb.group(
  {
    dob: ['', Validators.required],
    email: [
      '',
      Validators.compose([Validators.required, emailValidator]),
    ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  },
  { validator: matchingPasswords('password', 'confirmPassword') },
);
```

Instead of setting an error on the ControlGroup, do so on the actual field as follows:

```js
function matchingPasswords(
  passwordKey: string,
  passwordConfirmationKey: string,
) {
  return (group: ControlGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput =
      group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({
        notEquivalent: true,
      });
    }
  };
}
```
