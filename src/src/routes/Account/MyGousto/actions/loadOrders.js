import { getAccessToken } from 'selectors/auth'
import { fetchUserOrders } from 'apis/user'
import { asyncAndDispatch } from '../../../GetHelp/actions/utils'
import { actionTypes } from './actionTypes'
import { mockOrders } from '../../../../nourishised'

export const loadOrders = () => async (dispatch, getState) => {
  const state = getState()
  const accessToken = getAccessToken(state)

  const getPayload = async () => {
    const { data: orders } = await fetchUserOrders(accessToken, {
      limit: 10,
      sort_order: 'desc',
      state: 'pending',
    })
    mockOrders(orders)

    return { orders }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.MY_GOUSTO_LOAD_ORDERS,
    getPayload,
    errorMessage: 'Failed to load orders for My Gousto',
  })
}
