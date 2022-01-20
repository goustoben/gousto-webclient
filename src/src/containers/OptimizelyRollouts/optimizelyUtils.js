import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { getAuthUserId } from 'selectors/auth'
import globalsConfig from 'config/globals'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import { getOptimizelyInstance, hasValidInstance } from './optimizelySDK'

export const getSnowplowDomainUserId = () => {
  if (!globalsConfig.client) {
    return null
  }
  if (!window.Snowplow) {
    return null
  }

  // Corresponds to 'cf' defined in the Snowplow tag in GTM.
  // https://tagmanager.google.com/#/container/accounts/13119862/containers/669372/workspaces/1000271/tags
  const tracker = window.Snowplow.getTrackerCf()
  if (!tracker) {
    return null
  }

  const result = tracker.getDomainUserId()

  return result
}

export const getUserIdForOptimizely = (userId) => {
  const userIdForOptimizely = userId || getSnowplowDomainUserId()

  return userIdForOptimizely
}

export const isOptimizelyFeatureEnabledFactory = (name) =>
  async (dispatch, getState) => {
    const withVersionPrefixAsFalse = false
    const userId = getAuthUserId(getState())
    const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
    const userIdForOptimizely = getUserIdForOptimizely(userId)

    if (!userIdForOptimizely) {
      return false
    }

    const optimizelyInstance = await getOptimizelyInstance()

    if (!hasValidInstance()) {
      return false
    }

    const featureValue = optimizelyInstance.isFeatureEnabled(name, userIdForOptimizely)

    dispatch(trackExperimentInSnowplow(name, featureValue, userId, sessionId, userIdForOptimizely))

    return featureValue
  }
