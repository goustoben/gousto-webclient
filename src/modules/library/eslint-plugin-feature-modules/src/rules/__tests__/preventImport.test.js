const { ESLintUtils } = require('@typescript-eslint/utils')

const { preventImport, MessageIds } = require('../preventImport')

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run(`prevent-import: ${MessageIds.AvoidZest}`, preventImport, {
  valid: [
    {
      code: 'import { Button } from "@gousto-internal/citrus-react"',
    },
  ],
  invalid: [
    {
      code: 'import { Button } from "goustouicomponents"',
      errors: [{ messageId: MessageIds.AvoidZest }],
    },
  ],
})

ruleTester.run(`prevent-import: ${MessageIds.AvoidImportFeatureIntoFeature}`, preventImport, {
  valid: [
    {
      code: 'import { Test } from "../Sibling"',
    },
  ],
  invalid: [
    {
      code: 'import { Test } from "@features/module"',
      errors: [{ messageId: MessageIds.AvoidImportFeatureIntoFeature }],
    },
  ],
})
