async function something() {
  try {
    const [foo, baz] = await Promise.all([
      getFromAPI('foo'),
      getFromAPI('baz'),
    ]);
    console.log(foo, baz);
  } catch (error) {
    console.warn(error);
  } finally {
    // something usefull
  }
}

something();
