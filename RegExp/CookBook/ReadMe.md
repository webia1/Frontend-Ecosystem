# RegExp CookBook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VSCode](#vscode)
- [JSON](#json)
  - [Replace blank spaces with underscores in JSON Keys](#replace-blank-spaces-with-underscores-in-json-keys)

<!-- /code_chunk_output -->

## VSCode

## JSON

### Replace blank spaces with underscores in JSON Keys

Find: `("[^"\n]*?)\s([^"\n]*?":)` and replace with `$1_$2`. You have to repeat this operation until all blank spaces are replaced with underscores.

```json
{
  "key with blank spaces": "value",
  "another key with blank spaces": "value"
}
```
