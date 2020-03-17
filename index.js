const fs = require('fs');
const globby = require('globby');
const normalize = require('normalize-path');

const updateSingleFile = (path, modifier) => {
	let cnt = fs.readFileSync(path, 'utf8');
	cnt = modifier(cnt);
	fs.writeFileSync(path, cnt, 'utf8');
};

const fsu = {
	/**
	 * Update the contents of file
	 * @param {string|string[]} path path or glob pattern of file to edit
	 * @param {function} modifier A function that modifies the content passed
	 */
	updateSync: (path, modifier) => {
		let paths = Array.isArray(path) ? path : [path];
		paths = paths.map(normalize);
		paths = globby.sync(paths);
		paths.forEach(path => updateSingleFile(path, modifier));
	}
};

module.exports = fsu;
