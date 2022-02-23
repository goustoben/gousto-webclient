import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { getAuthUserId } from 'selectors/auth'
import { canUseWindow } from 'utils/browserEnvironment'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import { getOptimizelyInstance, hasValidInstance } from './optimizelySDK'

export const getSnowplowDomainUserId = () => {
  if (!canUseWindow() || !window.snowplow) {
    return Promise.resolve(null)
  }

  // https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-trackers/javascript-tracker/javascript-tracker-v3/advanced-usage/tracker-callbacks/

  return new Promise((resolve, reject) => {
    // Note: must use `function()` instead of an arrow function syntax because
    // the API returns the tracker holder in `this`.
    window.snowplow(function callback() {
      // Corresponds to 'cf' defined in the Snowplow tag in GTM.
      // https://tagmanager.google.com/#/container/accounts/13119862/containers/669372/workspaces/1000271/tags
      const tracker = this.cf

      if (!tracker) {
        reject(new Error('No snowplow tracker'))
      }

      const domainUserId = tracker.getDomainUserId()

      resolve(domainUserId)
    })
  })
}

export const getUserIdForOptimizely = async (userId) => {
  const userIdForOptimizely = userId || await getSnowplowDomainUserId()

  return userIdForOptimizely
}

export const isOptimizelyFeatureEnabledFactory = (name) =>
  async (dispatch, getState) => {
    const withVersionPrefixAsFalse = false
    const userId = getAuthUserId(getState())
    const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
    const userIdForOptimizely = await getUserIdForOptimizely(userId)

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
