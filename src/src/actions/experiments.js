import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import { getUserExperiments } from 'apis/userBucketing'
import { actionTypes } from './actionTypes'
import { getAuthUserId } from '../selectors/auth'
import { shouldFetchExperiments } from '../selectors/experiments'
import statusActions from './status'

const { pending } = statusActions

export function storeUserExperiments(experiments) {
  return {
    type: actionTypes.EXPERIMENTS_RECEIVED,
    payload: {
      experiments
    }
  }
}

export function appendUserExperiment(experiment) {
  return {
    type: actionTypes.EXPERIMENTS_APPEND,
    payload: {
      experiment
    }
  }
}

export function removeUserExperiments() {
  return {
    type: actionTypes.EXPERIMENTS_REMOVE,
    payload: {}
  }
}

export function fetchUserExperiments() {
  return async (dispatch, getState) => {
    const sessionId = Cookies.get('gousto_session_id')
    const userId = getAuthUserId(getState())
    const shouldFetchUserExperiments = shouldFetchExperiments(getState())

    if (!sessionId || !shouldFetchUserExperiments) {
      return
    }

    try {
      dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, true))
      const { data } = await getUserExperiments(sessionId, userId)
      dispatch(storeUserExperiments(data))
    } catch (error) {
      logger.error({ message: 'Failed to retrieve user experiments', extra: { error } })
    } finally {
      dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, false))
    }
  }
}
