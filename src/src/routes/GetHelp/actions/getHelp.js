import { browserHistory } from 'react-router'
import logger from 'utils/logger'
import { client as clientRoutes } from 'config/routes'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import * as userApi from 'apis/user'
import { applyDeliveryCompensation } from 'apis/getHelp'
import webClientStatusActions from 'actions/status'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'
import { asyncAndDispatch } from './utils'

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

export const storeGetHelpOrder = ({ id, recipeIds, recipeDetailedItems, deliverySlot }) => ({
  type: actionTypes.GET_HELP_STORE_ORDER,
  payload: {
    id,
    recipeIds,
    recipeDetailedItems,
    deliverySlot,
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

export const applyDeliveryRefund = (
  userId,
  orderId,
  complaintCategory,
  refundValue
) => async (dispatch, getState) => {
  const getPayload = async () => {
    const accessToken = getState().auth.get('accessToken')
    const { index, confirmation } = clientRoutes.getHelp
    await applyDeliveryCompensation(accessToken, userId, orderId, complaintCategory, refundValue)
    browserHistory.push(`${index}/${confirmation}`)
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
    getPayload,
    errorMessage: `Failed to applyDeliveryRefund of £${refundValue} for userId: ${userId}, orderId: ${orderId}`,
  })
}

export const loadTrackingUrl = (orderId) => async (dispatch, getState) => {
  const getPayload = async () => {
    const accessToken = getState().auth.get('accessToken')
    const response = await fetchDeliveryConsignment(accessToken, orderId)
    const { trackingUrl } = response.data[0]

    return { trackingUrl }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_LOAD_TRACKING_URL,
    getPayload,
    errorMessage: `Failed to loadTrackingUrl for orderId: ${orderId}`,
  })
}
