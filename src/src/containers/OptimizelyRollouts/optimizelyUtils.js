import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { getAuthUserId } from 'selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import { getOptimizelyInstance, hasValidInstance } from './optimizelySDK'

export const isOptimizelyFeatureEnabledFactory = (featureName) => async (dispatch, getState) => {
  const withVersionPrefixAsFalse = false
  const authUserId = getAuthUserId(getState())
  const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
  const userId = authUserId || sessionId

  if (!userId) {
    return false
  }

  const optimizelyInstance = await getOptimizelyInstance()

  if (!hasValidInstance()) {
    return false
  }

  const isEnabled = optimizelyInstance.isFeatureEnabled(featureName, userId)

  dispatch(trackExperimentInSnowplow(featureName, isEnabled, authUserId, sessionId))

  return isEnabled
}
