import { getAccessToken } from 'selectors/auth'
import { fetchProjectedDeliveries } from '../../apis/subscription'
import { asyncAndDispatch } from '../../../GetHelp/actions/utils'
import { actionTypes } from './actionTypes'

export const loadNextProjectedOrder = (userId) => async (dispatch, getState) => {
  const state = getState()
  const accessToken = getAccessToken(state)

  const getPayload = async () => {
    const response = await fetchProjectedDeliveries(accessToken, userId)

    if (!(response.data && response.data.data)) {
      return { nextProjectedOrder: null }
    }

    const { data: { data: { projectedDeliveries } } } = response

    const nonSkippedDeliveries = projectedDeliveries
      .filter(projectedDelivery => projectedDelivery.skipped === false)

    return { nextProjectedOrder: nonSkippedDeliveries[0] || null }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.LOAD_NEXT_PROJECTED_ORDER,
    getPayload,
    errorMessage: `Failed to load next projected delivery for: ${userId}`,
  })
}
