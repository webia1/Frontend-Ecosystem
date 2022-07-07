namespace AbortControllerExample {
  const timeout = 220; // ms
  const controller = new AbortController();
  const signal = controller.signal;
  const url = 'https://swapi.dev/api/people/1/';

  fetch(url, { signal })
    .then((res: any) =>
      res
        ?.json()
        .then((res: any) => console.log('Luke: ', res?.name)),
    )
    .catch((err) => console.log('Error: ', err));

  setTimeout(() => {
    controller.abort();
  }, timeout);
}
