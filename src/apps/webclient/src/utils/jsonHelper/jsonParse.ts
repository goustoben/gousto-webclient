import logger from 'utils/logger'

// todo Replace this type shim once we have Datadog in place
type Logger = {
  error: (r: Record<string, unknown>) => void
}

/**
 * Module
 * ============================================================================
 */

export function JSONParse(text: string, returnRawData: boolean): unknown {
  try {
    if (returnRawData) {
      return JSON.parse(text)
    }

    const camelCaseText = snakeCaseSubstringsToCamelCase(text)

    return JSON.parse(camelCaseText)
  } catch (e) {
    ;(logger as Logger).error({ message: `JSONParse failed with text: "${text}"`, errors: [e] })
    throw new Error('An error occurred, please try again.')
  }
}

/**
 * Internals
 * ============================================================================
 */

/**
 * Replace any snake_case tokens in a string with camelCased equivalents.
 */
function snakeCaseSubstringsToCamelCase(text: string) {
  return text.replace(/"\w+?":/g, (key) => key.replace(/_\w/g, (match) => match[1].toUpperCase()))
}
