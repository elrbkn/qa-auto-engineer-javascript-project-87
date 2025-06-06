import formatPlain from './plain.js';
import formatStylish from './stylish.js';


const format = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
