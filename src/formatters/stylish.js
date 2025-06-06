const formatStylish = (diff) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'removed':
        return `  - ${node.key}: ${node.value}`;
      case 'updated':
        return [`  - ${node.key}: ${node.oldValue}`, `  + ${node.key}: ${node.newValue}`];
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${lines.flat().join('\n')}\n}`;
};

export default formatStylish;
