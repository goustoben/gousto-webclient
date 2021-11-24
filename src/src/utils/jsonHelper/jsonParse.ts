import logger from 'utils/logger';

/**
 * Module
 * ============================================================================
 */

export function JSONParse(text: string, returnRawData: boolean): unknown { // eslint-disable-line new-cap
  try {
    if (returnRawData) {
      return JSON.parse(text)
    }

    const camelCaseText = snakeCaseSubstringsToCamelCase(text)

    return JSON.parse(camelCaseText)
  } catch (e) {
    logger.error({ message: `JSONParse failed with text: "${text}"`, errors: [e] })
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
  return text.replace(/"\w+?":/g, key => key.replace(/_\w/g, match => match[1].toUpperCase()))
}
