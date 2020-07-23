import logger from 'utils/logger'
import * as userApi from 'apis/user'
import webClientStatusActions from 'actions/status'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'

export const trackDeliveryOther = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryOther Clicked',
  },
})

export const trackDeliveryStatus = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryStatus Clicked',
  },
})

export const trackNextBoxTrackingClick = orderId => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackMyBox Clicked',
    orderId,
  }
})

export const getUserOrders = (orderType = 'pending', number = 10) => (
  async (dispatch, getState) => {
    dispatch(webClientStatusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS, true))
    dispatch(webClientStatusActions.error(actionTypes.GET_HELP_LOAD_ORDERS, null))

    try {
      const accessToken = getState().auth.get('accessToken')
      const { data: orders } = await userApi.fetchUserOrders(accessToken, {
        limit: number,
        sort_order: 'desc',
        state: orderType,
        includes: ['shipping_address']
      })

      dispatch({
        type: actionTypes.GET_HELP_LOAD_ORDERS,
        orders
      })
    } catch (err) {
      dispatch(webClientStatusActions.error(actionTypes.GET_HELP_LOAD_ORDERS, err.message))
      logger.error(err)
    }
    dispatch(webClientStatusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS, false))
  }
)

export const storeGetHelpOrder = ({ id, recipeIds, recipeDetailedItems }) => ({
  type: actionTypes.GET_HELP_STORE_ORDER,
  payload: {
    id,
    recipeIds,
    recipeDetailedItems,
  },
})

export const trackRejectRefund = (amount) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.clickDeclinedRefund,
    amount,
  }
})

export const trackConfirmationCTA = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.clickDoneRefundAccepted,
  }
})
