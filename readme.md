# fsu - File Update utility

## Installation

```
npm install @web-stack/fsu
```

## Usage

```
const fsu = require('@web-stack/fsu');

fsu.update('/path/to/file', (content) => {
  // Manke changes to content
  return content;
});
```


