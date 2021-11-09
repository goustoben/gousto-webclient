import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { useMountedState } from 'react-use'
import { getAuthUserId } from 'selectors/auth'
import { getOptimizelyInstance, hasValidInstance } from './optimizelySDK'
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

  const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)
  const userId = useSelector(getAuthUserId)
  const userIdForOptimizely = userId || sessionId
  const [instance, setInstance] = React.useState(null)
  const isMounted = useMountedState()
  const getIsFeatureEnabled = React.useCallback(() => {
    // if we have no instance
    if (!instance) return false

    // If we don't have a valid instance, we can't use Optimizely
    if (!hasValidInstance()) return false

    return instance.isFeatureEnabled(name, userIdForOptimizely)
  }, [name, userIdForOptimizely, instance])
  const isEnabled = getIsFeatureEnabled()
  const cookieOverwrite = get(Cookies, 'gousto_optimizely_overwrites')
  const overwrite = cookieOverwrite && typeof cookieOverwrite === 'object' ? (cookieOverwrite[name] || null) : null
  const hasOverwrite = overwrite !== null

  React.useEffect(() => {
    // If we don't have a userId or sessionId,
    // we can't use Optimizely to track the experiment
    if (!userIdForOptimizely) return

    // if we have a valid instance we don't need to fetch an instance
    if (instance && hasValidInstance()) return

    const loadOptimizelyInstance = async () => {
      // We return if we have an instance already
      if (instance) return

      const optimizelyInstance = await getOptimizelyInstance()

      // We don't want to call setState if we have unmounted
      if (isMounted()) {
        setInstance(optimizelyInstance)
      }
    }

    loadOptimizelyInstance()
  }, [instance, userIdForOptimizely, isMounted])

  // Track when we get feature from optimizely
  React.useEffect(() => {
    if (instance && hasValidInstance()) {
      dispatch(trackExperimentInSnowplow(name, isEnabled, userId, sessionId))
    }
  }, [
    instance,
    name,
    isEnabled,
    userId,
    sessionId,
    dispatch,
  ])

  if (hasOverwrite) {
    return overwrite
  }

  return isEnabled
}
