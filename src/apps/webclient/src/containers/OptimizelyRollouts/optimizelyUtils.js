import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { getAuthUserId } from 'selectors/auth'
import logger from 'utils/logger'
import { getSnowplowDomainUserId } from 'containers/OptimizelyRollouts/getSnowplowDomainUserId'
import {feLoggingLogEvent, logLevels} from 'actions/log'

import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import { getOptimizelyInstance, hasValidInstance, timeout } from './optimizelySDK'

export const getUserIdForOptimizely = async (userId) => {
  let userIdForOptimizely = userId

  if (!userIdForOptimizely) {
    try {
      userIdForOptimizely = await getSnowplowDomainUserId()
    } catch (error) {
      logger.error({message: error.message})
    }
  }

  return userIdForOptimizely
}

export const isOptimizelyFeatureEnabledFactory = (name) =>
  async (dispatch, getState) => {
    const withVersionPrefixAsFalse = false
    const userId = getAuthUserId(getState())
    const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
    const userIdForOptimizely = await getUserIdForOptimizely(userId)
    if (!userIdForOptimizely) {
      dispatch(feLoggingLogEvent(logLevels.error, `Optimizely factory method: experiment ${name} allocation failed because of snowplow`))

      return false
    }

    const optimizelyInstance = await getOptimizelyInstance()

    await optimizelyInstance.onReady({timeout})

    if (!hasValidInstance()) {
      dispatch(feLoggingLogEvent(logLevels.error, `Optimizely factory method: experiment ${name} allocation failed because of Optimizely`))

      return false
    }

    const featureValue = optimizelyInstance.isFeatureEnabled(name, userIdForOptimizely)

    dispatch(trackExperimentInSnowplow(name, featureValue, userId, sessionId, userIdForOptimizely))

    return featureValue
  }
