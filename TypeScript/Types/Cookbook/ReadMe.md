# Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Conversion between Objects](#conversion-between-objects)
- [Sophisticated Type Guards](#sophisticated-type-guards)

<!-- /code_chunk_output -->

## Conversion between Objects

```ts
export type KeyValueObjType = {
  key: string;
  value: string;
};

export type TranslationsType = {
  [index: string]: Array<KeyValueObjType>;
};

export const translations: TranslationsType = {
  de: [
    {
      key: 'SomeKey',
      value: 'Translation for Key',
    },
  ],
  en: [
    {
      key: 'SomeKey',
      value: 'Translation for Key',
    },
  ],
};

export const langKeys = Object.keys(translations);

export type LangKeysType = (typeof langKeys)[number]; // <- TRICK

/**
 * same as:
 *   export type LangKeysType = 'de' | 'en';
 *
 * But if you use it so, you have to initialise
 * these props in resultObj
 */

export type FlatValueType = {
  [key: string]: string;
};

export type FlatTranslationStringsType = {
  [lang in LangKeysType]: FlatValueType;
};

export const resultObj: FlatTranslationStringsType = {};

langKeys.forEach((langKey: string) => {
  const langArr: Array<KeyValueObjType> = translations[langKey];
  resultObj[langKey] = {};
  langArr.forEach((obj) => {
    resultObj[langKey][obj.key] = obj.value;
  });
});

console.log(resultObj);

/**
 * Output:
 * {
 *  de: { SomeKey: 'Translation for Key' },
 *  en: { SomeKey: 'Translation for Key' }
 * }
 */
```

## Sophisticated Type Guards

```ts
type MyCustomType = `A8${string}`;

function isMyCustomType(value: string): value is MyCustomType {
  return /^A8\d{2}$/.test(value);
}

function createUniqueArray<T extends ReadonlyArray<MyCustomType>>(
  arr: T,
): T {
  const uniqueSet = new Set(arr);
  if (uniqueSet.size !== arr.length) {
    throw new Error('Duplicate entries found in array.');
  }
  return arr;
}

const x = createUniqueArray(['A807', 'A811', 'A800'] as const);
```
