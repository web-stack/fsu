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

test.serial('Repeat content (sync)', t => {
  fsu.updateSync(testFile, cnt => cnt + cnt);
  t.is(fs.readFileSync(testFile, 'utf8'), testContent + testContent);
});

test.serial('Throw error when modifier doesn\'t return string', t => {
  t.throws(() => {
    fsu.updateSync(testFile, () => {});
  });
});

test.serial('Repeat content (async)', async t => {
  await fsu.update(testFile, cnt => cnt + cnt);
  t.is(await fs.promises.readFile(testFile, 'utf8'), testContent + testContent);
});

test.serial('Promise rejected when modifier doesn\'t return string', async t => {
  await t.throwsAsync(() => fsu.update(testFile, () => {}));
});
