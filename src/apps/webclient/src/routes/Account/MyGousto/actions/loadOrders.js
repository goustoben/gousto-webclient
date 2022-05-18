import * as orderV2 from 'routes/Menu/apis/orderV2'
import { asyncAndDispatch } from '../../../GetHelp/actions/utils'
import { actionTypes } from './actionTypes'

export const loadOrders = () => async (dispatch, getState) => {
  const getPayload = async () => {
    const payload = {
      limit: 10,
      sort_order: 'desc',
      state: 'pending',
      includes: ['shipping_address'],
    }
    const { data: orders } = await orderV2.fetchUserOrders(dispatch, getState, payload)

    return { orders }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.MY_GOUSTO_LOAD_ORDERS,
    getPayload,
    errorMessage: 'Failed to load orders for My Gousto',
  })
}
