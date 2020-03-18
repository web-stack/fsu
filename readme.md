# fsu - File Update utility

## Installation

```
npm install @web-stack/fsu
```

## Usage

```
const fsu = require('@web-stack/fsu');

fsu.update(patterns, (content) => {
  // Manke changes to content
  return content;
});
```

## API

### update(patterns, modifier)

Updates the file by applying the modifications to content and writes back to same path.
It accepts glob pattern to modify multiple files in one command.

#### patterns

Type: `string | string[]`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### modifier

Type: `function`

Parameters:
  * `content`: Contents of file as `string`

Returns: `string`

Modifier function has one argument passed - `contents` of the file. This function should return the modified contents as string.


### updateSync(patterns, modifier)

This is synchronous variant of `update()`. This returns a promise.

#### patterns

Type: `string | string[]`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### modifier

Type: `function`

Parameters:
  * `content`: Contents of file as `string`

Returns: `string`

Modifier function has one argument passed - `contents` of the file. This function should return the modified contents as string.
