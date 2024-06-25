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

Find: `("[^"\n]*?)\s([^"\n]*?":)` and replace with `$1_$2`.
