# Map

## Storing an array of unique objects

```ts
const planets = [
  { id: 1, name: 'Merkur' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' },
  { id: 2, name: 'Venus' }, // duplicate ID
  { id: 4, name: 'Mars' },
];

const uniquePlanetsMap = new Map();

planets.forEach((planet) => {
  uniquePlanetsMap.set(planet.id, planet);
});

console.log(uniquePlanetsMap.size); // 4, since the duplicate was removed

const merkur = uniquePlanetsMap.get(1);
console.log(merkur);

console.log(uniquePlanetsMap.has(2)); // true
console.log(uniquePlanetsMap);

/* Output:
Map(4) {
  1 => { id: 1, name: 'Merkur' },
  2 => { id: 2, name: 'Venus' },
  3 => { id: 3, name: 'Earth' },
  4 => { id: 4, name: 'Mars' }
}
*/

console.log(Array.from(uniquePlanetsMap));

/* Output:
[
  [ 1, { id: 1, name: 'Merkur' } ],
  [ 2, { id: 2, name: 'Venus' } ],
  [ 3, { id: 3, name: 'Earth' } ],
  [ 4, { id: 4, name: 'Mars' } ]
]
*/

console.log(Array.from(uniquePlanetsMap.values()));

/* Output:
[
  { id: 1, name: 'Merkur' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' },
  { id: 4, name: 'Mars' }
]
*/
```
