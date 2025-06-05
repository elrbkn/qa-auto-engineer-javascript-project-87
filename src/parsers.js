import fs from 'fs';
import path from 'path';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const parse = (data, ext) => {
  if (ext === '.json') {
    return JSON.parse(data);
  }
  throw new Error(`Unsupported file format: ${ext}`);
};

const parseFile = (filepath) => {
  const data = readFile(filepath);
  const ext = path.extname(filepath);
  return parse(data, ext);
};

export default parseFile;
