import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import { getUserExperiments, updateUserExperiment } from 'apis/userBucketing'
import { actionTypes } from './actionTypes'
import { getAuthUserId } from '../selectors/auth'
import { shouldFetchExperiments, shouldAssignUserToExperiment } from '../selectors/experiments'
import statusActions from './status'
import { experimentBucketedUser } from './trackingKeys'

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

export function appendDefaultUserExperiment(experimentName) {
  return {
    type: actionTypes.EXPERIMENTS_APPEND,
    payload: {
      experiment: {
        name: experimentName,
        bucket: 'control',
        withinExperiment: false
      }
    }
  }
}

export function removeUserExperiments() {
  return {
    type: actionTypes.EXPERIMENTS_REMOVE,
    payload: {}
  }
}

export function trackBucketedUser({ experimentName, withinExperiment, bucket }) {
  return {
    type: actionTypes.EXPERIMENTS_TRACK_USER_BUCKETING,
    trackingData: {
      actionType: experimentBucketedUser,
      experimentName,
      withinExperiment,
      bucket
    }
  }
}

export function fetchUserExperiments() {
  return async (dispatch, getState) => {
    const currentState = getState()
    const sessionId = Cookies.get('gousto_session_id')
    const userId = getAuthUserId(currentState)

    if (!sessionId) {
      return
    }

    try {
      dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, true))
      const { data } = await getUserExperiments(sessionId, userId)
      dispatch(storeUserExperiments(data))
    } catch (error) {
      logger.error({ message: 'Failed to retrieve user experiments', extra: { error } })
      dispatch({
        type: actionTypes.EXPERIMENTS_FETCH_ERROR,
      })
    } finally {
      dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, false))
    }
  }
}

export function assignUserToExperiment(experimentName) {
  return async (dispatch, getState) => {
    const currentState = getState()
    const sessionId = Cookies.get('gousto_session_id')
    const userId = getAuthUserId(currentState)

    if (!sessionId || !experimentName) {
      return
    }

    try {
      dispatch(pending(actionTypes.EXPERIMENTS_ASSIGNING_USER, true))
      const { data } = await updateUserExperiment(experimentName, sessionId, userId)
      dispatch(trackBucketedUser({ experimentName, withinExperiment: data.withinExperiment, bucket: data.bucket }))
      dispatch(appendUserExperiment(data))
    } catch (error) {
      logger.error({ message: 'Failed to assign user to an experiment', extra: { error } })
      logger.info({ message: `Defaulting user to control bucket for experiment: ${experimentName}` })

      dispatch(appendDefaultUserExperiment(experimentName))
    } finally {
      dispatch(pending(actionTypes.EXPERIMENTS_ASSIGNING_USER, false))
    }
  }
}

export function fetchOrAssignUserToExperiment(experimentName) {
  return async (dispatch, getState) => {
    const currentState = getState()
    const fetchExperiments = shouldFetchExperiments(currentState)
    const assignUser = shouldAssignUserToExperiment(currentState, { experimentName })

    if (fetchExperiments) {
      dispatch(exports.fetchUserExperiments())
    } else if (assignUser) {
      dispatch(exports.assignUserToExperiment(experimentName))
    }
  }
}
