# Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Conversion between Objects](#conversion-between-objects)
- [Pattern Types](#pattern-types)

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

## Pattern Types

```ts
type PatternType<T extends string> = `${Extract<
  T,
  string
>}${string}`;

type TupleOfPatternStrings<T extends string> =
  T extends `${infer Prefix}${infer Pattern}`
    ? PatternType<Pattern>[Pattern] extends string
      ? [T, ...TupleOfPatternStrings<Pattern>]
      : never
    : [];

function createTupleOfPatternStrings<T extends string>(
  ...strings: TupleOfPatternStrings<T>
): TupleOfPatternStrings<T> {
  return strings;
}

const example: TupleOfPatternStrings<'A123'> =
  createTupleOfPatternStrings('A987');
```
