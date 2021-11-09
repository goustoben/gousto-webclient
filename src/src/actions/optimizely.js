import { logger } from 'utils/logger'
import { Cookies } from 'utils/GoustoCookies'
import { actionTypes } from './actionTypes'
import { getAuthUserId } from '../selectors/auth'
import statusActions from './status'
import { getOptimizelyInstance, hasInstance, isLoading } from '../containers/OptimizelyRollouts/optimizelySDK'

const { pending } = statusActions

export function loadOptimizelySDK() {
  return async (dispatch, getState) => {
    /**
     * We only want to load the SDK if we have a auth user id or session id
     * If instance is already loaded or loading we do not trigger again the load
     * This is to avoid an infinite loop
     */
    if ((!getAuthUserId(getState()) && !Cookies.get('gousto_session_id')) || hasInstance() || isLoading()) {
      return
    }

    try {
      dispatch(pending(actionTypes.OPTIMIZELY_ROLLOUT_LOADING, true))
      await getOptimizelyInstance()
    } catch (err) {
      logger.error({ message: 'Cannot load optimizely', err })
    } finally {
      dispatch(pending(actionTypes.OPTIMIZELY_ROLLOUT_LOADING, false))
    }
  }
}
