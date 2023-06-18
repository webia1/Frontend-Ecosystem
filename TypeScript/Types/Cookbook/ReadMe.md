# Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Conversion between Objects](#conversion-between-objects)
- [Sophisticated Type Guards](#sophisticated-type-guards)
- [Only 2 Letters in a special combination](#only-2-letters-in-a-special-combination)

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

/**
 * If you type anything else than MyCustomType in the array,
 * you will get an error.
 */

const x = createUniqueArray(['A807', 'A811', 'A800'] as const);
```

## Only 2 Letters in a special combination

```ts
type Only2Letters = `${'A' | 'B'}${string}`;

function isOnly2Letters(value: string): value is Only2Letters {
  return /^(A|B)[A-Z]{1}$/.test(value);
}

const y: Array<Only2Letters> = ['AA', 'AB', 'BA', 'BB', 'CC']; // <- Error 'CC'
```

## Type Guard + RunTime Check

```ts
export type BType = `${string}${number}${number}${number}`;

export function isBType(value: string): value is BType {
  return /^A8[012]{1}[0-9]{1}$/g.test(value);
}

export const BTypeArr: Array<BType> = [
  'A800',
  'A803',
  'A813',
  'A814',
  'A823',
  'A833',
];

BTypeArr.forEach((bType) => {
  if (!isBType(bType)) {
    console.warn(`Invalid BType: ${bType}`);
    console.log(`Expected: ${/^A8[012]{1}[0-9]{1}$/g}`);
    console.log(
      `Expected: A8 followed by 0, 1 or 2 followed by any number`,
    );
  }
});
```
