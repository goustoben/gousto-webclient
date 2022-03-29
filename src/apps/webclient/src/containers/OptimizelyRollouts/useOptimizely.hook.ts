import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { useLocalStorage } from 'usehooks-ts/dist/useLocalStorage'
import useMountedState from 'react-use/lib/useMountedState'
import { getAuthUserId } from 'selectors/auth'
import { locationQuery } from 'selectors/routing'
import { feLoggingLogEvent, logLevels } from 'actions/log'
import { getUserIdForOptimizely } from './optimizelyUtils'
import { getOptimizelyInstance, hasValidInstance, timeout } from './optimizelySDK'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const withVersionPrefixAsFalse = false

type OptimizelyInstance = {
  // eslint-disable-next-line no-unused-vars
  isFeatureEnabled: (featureName: string, UUID: string) => boolean
  // eslint-disable-next-line no-unused-vars
  onReady: (options: { timeout: number }) => Promise<void>
}

const KEY_FOR_FEATURES_OVERRIDES = 'opt_features'

/**
 * This hooks is added to the top App component to allow use to override Optimizely features.
 *
 * To override an features, you can use the query parameter `features` add the following to the URL:
 * https://www.gousto.co.uk/?opt_features=name_of_features_you_want_enabled=true,name_of_features_you_want_disabled=false
 *
 * To remove any overrides, add an empty query parameter `features`.
 * https://www.gousto.co.uk/?opt_features=
 */
export const useSetupOptimizelyOverride = () => {
  const query = useSelector(locationQuery)
  const { [KEY_FOR_FEATURES_OVERRIDES]: features = null } = query || {}
  const [localStorageFeatures, setLocalStorageFeatures] = useLocalStorage(
    KEY_FOR_FEATURES_OVERRIDES,
    ''
  )

  useEffect(() => {
    if (typeof global?.window === 'undefined') return

    if (features == null) return

    if (features === '') {
      if (!localStorageFeatures) return // eslint-disable-next-line no-unused-expressions
      global?.window?.localStorage?.removeItem(KEY_FOR_FEATURES_OVERRIDES)

      return
    }

    const lowerCaseFeatures = features?.toLowerCase()

    if (lowerCaseFeatures === localStorageFeatures) return

    setLocalStorageFeatures(lowerCaseFeatures)
  }, [features, localStorageFeatures, setLocalStorageFeatures])
}

export const useGetOptimizelyOverride = (name: string | null): [boolean, boolean] => {
  const overridesAsOff: [false, false] = [false, false]
  const [localStorageFeatures] = useLocalStorage(KEY_FOR_FEATURES_OVERRIDES, '')

  if (name === null) {
    return overridesAsOff
  }

  if (!localStorageFeatures) {
    return overridesAsOff
  }

  const hasOverride = Boolean(localStorageFeatures?.includes(name))
  const stringToCheck = `${name}=true`.toLowerCase()
  const valueOfOverride = Boolean(localStorageFeatures?.includes(stringToCheck))

  return [hasOverride, valueOfOverride]
}

const getSessionId = () => get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false)

export const useUserIdForOptimizely = () => {
  const userId = useSelector(getAuthUserId)
  const [userIdForOptimizely, setUserIdForOptimizely] = useState<null | string>(null)
  useEffect(() => {
    getUserIdForOptimizely(userId).then(result => {
      setUserIdForOptimizely(result)
    })
  }, [userId])

  return userIdForOptimizely
}

const overrideTracking: {[key: string]: boolean} = {}

export const useIsOptimizelyFeatureEnabled = (name: string | null) => {
  const dispatch = useDispatch()
  const [isEnabled, setEnabled] = useState<null | boolean>(null)
  const getIsMounted = useMountedState()
  const sessionId = getSessionId()
  const userId = useSelector(getAuthUserId)
  const userIdForOptimizely = useUserIdForOptimizely()
  const [hasOverride, valueOfOverride] = useGetOptimizelyOverride(name)

  useEffect(() => {
    // We allow the users to provide `null` as a name if they don't want to check Optimizely
    if (name == null) {
      return
    }

    // If we have no valid User ID, we can't check Optimizely
    if (!userIdForOptimizely) {
      return
    }

    // if we have an experiment override, we can return the value of the override
    if (hasOverride) {
      if (!overrideTracking[name]) {
        overrideTracking[name] = true
        dispatch(feLoggingLogEvent(logLevels.info, 'optimizelyFeatureEnabled-override', {
          userId,
          sessionId,
          featureName: name
        }))
      }

      return
    }

    getOptimizelyInstance().then((optimizelyInstance: OptimizelyInstance | null) => {
      // if optimizely instance is not returned, we can't check if the feature is enabled
      if (!optimizelyInstance) return

      /*
       * The Optimizely SDK instance can be in one of the three states:
       * (1) request for the data file hasn't started
       * (2) request for the data file has started but not yet finished
       * (3) request for the data file has finished (= instance is valid)
       *
       * With out the recall to `onReady` we fails to re-render the component between (2) and (3)
       *
       * This happens cause of
       * - page loads
       * - component requests SDK to start loading (assume a single component that uses a hook)
       *   there's no valid instance so default-control is rendered
       * - user clicks a button
       * - component re-renders, sees isValidInstance=true, flips the state to the variant
       *   (It's fine for the case where somebody else requested the data file, then we navigate
       *    to a page and the component sees isValidInstance=true when first rendering)
       *
       * Re-calling onReady().then(...) handles the case where we just come to the page;
       * and the case where the data file's already in place
       *
       * [PR-4356](https://github.com/Gousto/gousto-webclient/pull/4356)
       */
      optimizelyInstance.onReady({ timeout }).then(() => {
        // if optimizely instance is not valid, we can't check if the feature is enabled
        if (!hasValidInstance()) return

        // if we have unmounted the component we don't want to do anything
        if (!getIsMounted()) return

        const featureValue = optimizelyInstance.isFeatureEnabled(name, userIdForOptimizely)

        dispatch(
          trackExperimentInSnowplow(name, featureValue, userId, sessionId, userIdForOptimizely)
        )
        setEnabled(featureValue)
      })
    })
  }, [name, dispatch, hasOverride, userIdForOptimizely, userId, sessionId, getIsMounted])

  if (name == null) return null

  if (hasOverride) return valueOfOverride

  return isEnabled
}
