import { Map } from 'immutable'

import { signupConfig } from 'routes/Signup/signupConfig'

export const formatPrice = (price) => {
  if (Number.parseFloat(price) === 0) {
    return 'FREE'
  }

  return `£${price}`
}

/**
 * Get step object by name
 * @param stepName
 */
export function stepByName(stepName) {
  return Map(signupConfig.steps.find((step) => step.name === stepName) || {})
}

/**
 * Get Step object by slug
 * @param stepSlug
 * @deprecated please use findStepBySlug instead.
 */
export function stepBySlug(stepSlug) {
  return Map(signupConfig.steps.find((step) => step.slug === stepSlug) || {})
}

/**
 * @return Immutable.Map with keys `slug` and `name`; or null if not found.
 */
export const findStepBySlug = (stepSlug) => {
  const stepJs = signupConfig.steps.find((step) => step.slug === stepSlug)
  if (!stepJs) {
    return null
  }

  return Map(stepJs)
}

/**
 * @return Immutable.Map with keys `slug` and `name`; or null if not found.
 */
export const getStepFromPathname = (pathname) => {
  const parts = pathname.split('/')
  const stepSlug = parts[parts.length - 1]

  return findStepBySlug(stepSlug)
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

/**
 * When a user lands on any signup step besides first, they are redirected to
 * the first step.  This function provides exceptions to this.
 *
 * @param stepSlug: the path of URL after "/signup/", e.g. "start" when the URL
 * path is `/signup/start`
 *
 * @return if true, then this step or a step-like page can be landed upon
 */
export const canLandOnStepWithoutRedirecting = (stepSlug) => {
  const allowedSlugs = signupConfig.canLandOnStepWithoutRedirecting

  return allowedSlugs.includes(stepSlug)
}
