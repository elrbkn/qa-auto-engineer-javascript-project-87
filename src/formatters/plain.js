const formatValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (value === null) return 'null';
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const formatPlain = (diffTree, parent = '') => {
  const lines = diffTree.flatMap((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'updated':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, property);
      default:
        return [];
    }
  });

  return lines.join('\n');
};

export default formatPlain;
