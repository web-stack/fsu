import fsu from '..';
import test from 'ava';

const fs = require('fs');
const path = require('path');

const testFiles = [
	path.join(__dirname, './test1.txt'),
	path.join(__dirname, './test2.txt')
];
const testContent = 'test-content';

test.beforeEach(() => {
	testFiles.forEach(f => {
		fs.writeFileSync(f, testContent, 'utf8');
	});
});

test.afterEach(() => {
	testFiles.forEach(f => {
		fs.unlinkSync(f);
	});
});

test.serial('Modify multiple files by * pattern', t => {
	const pattern = path.join(__dirname, './*.txt');
	fsu.updateSync(pattern, cnt => cnt + cnt);
	t.is(fs.readFileSync(testFiles[0], 'utf8'), testContent + testContent);
	t.is(fs.readFileSync(testFiles[1], 'utf8'), testContent + testContent);
});

test.serial('Modify multiple files by array pattern', t => {
	const patterns = ['./*1.txt', './*2.txt'].map(p => path.join(__dirname, p));
	fsu.updateSync(patterns, cnt => cnt + cnt);
	t.is(fs.readFileSync(testFiles[0], 'utf8'), testContent + testContent);
	t.is(fs.readFileSync(testFiles[1], 'utf8'), testContent + testContent);
});
