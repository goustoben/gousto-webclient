import { getAccessToken } from 'selectors/auth'
import { fetchShippingAddresses } from '../apis/core'
import { asyncAndDispatch } from './utils'
import { actionTypes } from './actionTypes'

export const loadShippingAddresses = (userId) => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())

  const getPayload = async () => {
    const response = await fetchShippingAddresses(accessToken)

    return response.data
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_LOAD_SHIPPING_ADDRESSES,
    getPayload,
    errorMessage: `Failed to loadShippingAddresses userId: ${userId}`
  })
}
