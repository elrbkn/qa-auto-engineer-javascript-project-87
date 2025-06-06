import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedPlain = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

const expectedJson = [
  { key: 'follow', type: 'removed', value: false },
  { key: 'host', type: 'unchanged', value: 'hexlet.io' },
  { key: 'proxy', type: 'removed', value: '123.234.53.22' },
  { key: 'timeout', type: 'updated', oldValue: 50, newValue: 20 },
  { key: 'verbose', type: 'added', value: true },
];

test('gendiff flat JSON (stylish)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toBe(expectedStylish);
});

test('gendiff flat YAML (stylish)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2)).toBe(expectedStylish);
});

test('gendiff flat JSON (plain)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'plain')).toBe(expectedPlain);
});

test('gendiff flat YAML (plain)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'plain')).toBe(expectedPlain);
});

test('gendiff flat JSON (json)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = JSON.parse(genDiff(file1, file2, 'json'));
  expect(result).toEqual(expectedJson);
});

test('gendiff flat YAML (json)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const result = JSON.parse(genDiff(file1, file2, 'json'));
  expect(result).toEqual(expectedJson);
});
