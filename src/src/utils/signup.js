import { Map } from 'immutable'
import { signupConfig } from 'config/signup'

/**
 * Get step object by name
 * @param stepName
 */
export function stepByName(stepName) {
  return Map(signupConfig.steps.find(step => step.name === stepName) || {})
}

/**
 * Get Step object by slug
 * @param stepSlug
 */
export function stepBySlug(stepSlug) {
  return Map(signupConfig.steps.find(step => step.slug === stepSlug) || {})
}

/**
 * Get promocode query string parameter (if provided)
 * @param promocode
 * @param operator
 * @returns {*}
 */
export function getPromocodeQueryParam(promocode, operator = '&') {
  if (promocode) {
    return `${operator}promo_code=${promocode}`
  }

  return ''
}
