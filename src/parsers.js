import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml'; // ← обязательно установить: npm i js-yaml

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const parse = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

const parseFile = (filepath) => {
  const data = readFile(filepath);
  const ext = path.extname(filepath);
  return parse(data, ext);
};

export default parseFile;
