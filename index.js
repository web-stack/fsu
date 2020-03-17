const fs = require('fs');

const fsu = {
	/**
	 * Update the contents of file
	 * @param {string} path path of file to edit
	 * @param {function} modifier A function that modifies the content passed
	 */
	updateSync: (path, modifier) => {
		let cnt = fs.readFileSync(path, 'utf8');
		cnt = modifier(cnt);
		fs.writeFileSync(path, cnt, 'utf8');
	}
};

module.exports = fsu;
