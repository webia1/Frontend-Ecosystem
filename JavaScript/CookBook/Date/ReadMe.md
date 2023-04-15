# Date

## Same day or before

```js
// moment.js
const moment = require('moment');
const startDate1 = moment('2023-04-16').format('YYYY-MM-DD');
const dueDate1 = moment('2023-04-17').format('YYYY-MM-DD');
const isBeforeOrSame1 = moment(startDate1).isBefore(
  dueDate1,
  'day',
);

// native vanilla js
const startDate2 = new Date('2023-04-16');
const dueDate2 = new Date('2023-04-17');
const isBeforeOrSame2 =
  startDate2.getFullYear() === dueDate2.getFullYear() &&
  startDate2.getMonth() === dueDate2.getMonth() &&
  startDate2.getDate() <= dueDate2.getDate();

console.log('isBeforeOrSame1', isBeforeOrSame1);
console.log('isBeforeOrSame2', isBeforeOrSame2);
```
