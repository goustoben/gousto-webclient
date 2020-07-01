/*
 * This file is ported from the brand API and is a good candidate for making into an external npm module
 * which webclient and brand-api can then consume.
 */

import { getFeatures } from './featureData'

// eslint-disable-next-line no-bitwise
const hashCode = (input) => Array.from(input).reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0)

export const isEnabled = (experimentName, userId, sessionId) => {
  const feature = getFeatures().get(experimentName)
  if (!feature) {
    return false
  }

  if (feature.percentage === 100) {
    return true
  }

  if (feature.percentage === 0) {
    return false
  }

  const userKey = userId || sessionId

  if (!userKey) {
    return false
  }

  const hashString = `${experimentName}:${userKey}`
  const hash = Math.abs(hashCode(hashString)) % 100

  return hash <= feature.percentage
}
