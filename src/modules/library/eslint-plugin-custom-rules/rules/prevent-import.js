module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source && node.source.value.includes('styles/screenSizes')) {
          return context.report(node, node.source.loc, `Do not import zest into features`)
        }
      },
    }
  },
}

