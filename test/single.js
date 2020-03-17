const fs = require('fs');
const path = require('path');
const test = require('ava');

const fsu = require('..');

const testFile = path.join(__dirname, 'single-test');
const testContent = 'test-content';

test.beforeEach(() => {
	fs.writeFileSync(testFile, testContent, 'utf8');
});

test.afterEach(() => {
	fs.unlinkSync(testFile);
});

test('Repeat content', t => {
	fsu.updateSync(testFile, cnt => cnt + cnt);
	t.is(fs.readFileSync(testFile, 'utf8'), testContent + testContent);
});
