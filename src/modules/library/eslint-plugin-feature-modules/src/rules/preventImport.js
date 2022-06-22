const { ESLintUtils } = require('@typescript-eslint/utils')

const MessageIds = {
  AvoidZest: 'avoidZest',
  AvoidImportFeatureIntoFeature: 'avoidImportFeatureIntoFeature',
}

const importRules = [
  {
    pattern: /@features\//,
    messageId: MessageIds.AvoidImportFeatureIntoFeature,
  },
  {
    pattern: /goustouicomponents|design-language|zest/,
    messageId: MessageIds.AvoidZest,
  },
]

const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/Gousto/gousto-webclient/blob/develop/docs/modules.md',
)

const preventImport = createRule({
  create(context) {
    return {
      ImportDeclaration(node) {
        for (const importRule of importRules) {
          if (importRule.pattern.test(node.source.value)) {
            return context.report({
              node,
              messageId: importRule.messageId,
            })
          }
        }
      },
    }
  },
  name: 'prevent-import',
  meta: {
    type: 'problem',
    docs: {
      description: 'FEF defined import restrictions for feature modules',
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      [MessageIds.AvoidImportFeatureIntoFeature]: 'Importing features into other features is not allowed',
      [MessageIds.AvoidZest]: 'Please use Citrus instead of Zest - https://github.com/Gousto/citrus',
    },
  },
  defaultOptions: [],
})

module.exports = {
  MessageIds,
  preventImport,
}
