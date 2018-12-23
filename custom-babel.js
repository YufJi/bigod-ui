const nodePath = require('path');
const { addSideEffect } = require('@babel/helper-module-imports')

module.exports = ({ types: t }) => {
  const ret = {
    visitor: {
      ImportDeclaration(path, state = { opts: {} }) {
        const { node } = path;
        if (!node) return;
        const { opts = {} } = state;
        const { value } = node.source;
        const { specifiers } = node;
        console.log(value, 'value');
        if (value === opts.libraryName) {
          specifiers.forEach(specifier => {
            const filePath = nodePath.join(value, specifier.local.name, 'index.less');
            addSideEffect(path, filePath);
          });
        }
      },
    },
  };
  return ret;
};