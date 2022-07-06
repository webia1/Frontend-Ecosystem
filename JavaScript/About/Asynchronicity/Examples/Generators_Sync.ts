namespace example1 {
  const starWarsPeople: any = [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
    // 'https://swapi.dev/api/people/none-existing/',
  ];

  starWarsPeople[Symbol.iterator] = function* () {
    for (let url of this) {
      yield this[url];
    }
  };

  const iterator = starWarsPeople[Symbol.iterator]();

  console.log(
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
  );
}
