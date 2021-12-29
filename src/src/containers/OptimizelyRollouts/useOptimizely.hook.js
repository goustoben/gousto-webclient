import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { useMountedState } from 'react-use'
import { getAuthUserId } from 'selectors/auth'
import { timeout, getOptimizelyInstance, hasValidInstance } from './optimizelySDK'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const withVersionPrefixAsFalse = false

/*
 * Hook to check if Optimizely is enabled, we can override the experiment using
 * a cookie called `v1_gousto_optimizely_overwrites` with a value of `{%22${experiment_name}%22:true}`
 *
 * Example Value: {%22radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled%22:true}
 */
export const useIsOptimizelyFeatureEnabled = (name) => {
  const dispatch = useDispatch()

  const [isEnabled, setEnabled] = useState(null)

  const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
  const userId = useSelector(getAuthUserId)
  const getIsMounted = useMountedState()
  const userIdForOptimizely = userId || sessionId

  useEffect(() => {
    if (!userIdForOptimizely) {
      return
    }
    getOptimizelyInstance().then((optimizelyInstance) => {
      optimizelyInstance.onReady({ timeout }).then(() => {
        if (hasValidInstance() && getIsMounted()) {
          const featureValue = optimizelyInstance.isFeatureEnabled(name, userIdForOptimizely)

          dispatch(trackExperimentInSnowplow(name, featureValue, userId, sessionId))
          setEnabled(featureValue)
        }
      })
    })
  }, [name, dispatch, userIdForOptimizely, userId, sessionId, getIsMounted])

  const cookieOverride = get(Cookies, 'gousto_optimizely_overwrites')
  const override = cookieOverride && typeof cookieOverride === 'object'
    ? (cookieOverride[name] ?? null)
    : null

  if (override !== null) {
    return override
  }

  return isEnabled
}
