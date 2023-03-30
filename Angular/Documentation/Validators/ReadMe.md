# Angular Validators

## Getting Values From Store

```js
import { Store } from '@ngrx/store';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxValueValidator(store: Store<any>): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: any } | null => {
    const maxValue = store.select('maxValue');
    if (control.value > maxValue) {
      return { maxValueExceeded: true };
    }
    return null;
  };
}
```
