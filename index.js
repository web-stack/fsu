const fs = require('fs');
const globby = require('globby');
const normalize = require('normalize-path');

const returnTypeError = () => new TypeError('Modifier function should return updated content');

const updateSingleFileSync = (path, modifier) => {
  let cnt = fs.readFileSync(path, 'utf8');
  cnt = modifier(cnt);

  if (typeof cnt !== 'string') {
    throw returnTypeError();
  }

  fs.writeFileSync(path, cnt, 'utf8');
};

const updateSingleFile = async (path, modifier) => {
  let cnt = await fs.promises.readFile(path, 'utf8');
  cnt = modifier(cnt);

  if (typeof cnt !== 'string') {
    return Promise.reject(returnTypeError());
  }

  return fs.promises.writeFile(path, cnt, 'utf8');
};

const fsu = {
  /**
   * Update the contents of file synchronously.
   * @param {string|string[]} path path or glob pattern of file to edit
   * @param {function} modifier A function that modifies the content passed and returns it
   * @throws {Error} throws an error if the return value from modifier function is not string
   */
  updateSync: (path, modifier) => {
    let paths = Array.isArray(path) ? path : [path];
    paths = paths.map(normalize);
    paths = globby.sync(paths);
    paths.forEach(path => updateSingleFileSync(path, modifier));
  },

  /**
   * Update the contents of file asynchronously
   * @param {string|string[]} path path or glob pattern of file to edit
   * @param {function} modifier A function that modifies the content passed and returns it
   * @returns {Promise}
   * @throws {Error} throws an error if the return value from modifier function is not string
   */
  update: async (path, modifier) => {
    let paths = Array.isArray(path) ? path : [path];
    paths = paths.map(normalize);
    paths = await globby(paths);
    await Promise.all(paths.map(path => updateSingleFile(path, modifier)));
  }
};

module.exports = fsu;
