import Immutable from 'immutable'
import { push } from 'react-router-redux'

import { basketOrderLoad } from 'actions/basket'
import {
  productsLoadCategories,
  productsLoadProducts,
  productsLoadStock,
  productsLoadRecipePairings,
} from 'actions/products'
import config from 'config/routes'
import * as orderV2 from 'routes/Menu/apis/orderV2'
import { getOrderWhenStartDate } from 'routes/OrderConfirmation/utils/order'
import logger from 'utils/logger'
import { getUserOrderRecipeUuIds, getUserOrderRecipeIds } from 'utils/user'

import { fetchSimpleMenu } from '../routes/Menu/fetchData/menuApi'
import { getAuthUserId, getAccessToken } from '../selectors/auth'
import { actionTypes } from './actionTypes'
import { orderCheckPossibleDuplicate } from './order'
import recipeActions from './recipes'

export const orderConfirmationRedirect = (orderId, orderAction) => (dispatch) => {
  const confirmationUrl = config.client.orderConfirmation.replace(':orderId', orderId)
  dispatch(orderCheckPossibleDuplicate(orderId))
  dispatch(push(orderAction ? `${confirmationUrl}?order_action=${orderAction}` : confirmationUrl))
}

export const orderDetails = (orderId) => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())
  const userId = getAuthUserId(getState())

  try {
    dispatch(productsLoadCategories())
    dispatch(productsLoadStock())
    const include = 'shipping_address'
    const { data: order } = await orderV2.fetchOrder(dispatch, getState, orderId, include)
    const { data: menus } = await fetchSimpleMenu(accessToken, userId)
    const immutableOrderDetails = Immutable.fromJS(order)
    const orderRecipeUuIds = getUserOrderRecipeUuIds(immutableOrderDetails)
    dispatch(recipeActions.recipesLoadFromMenuRecipesById(orderRecipeUuIds))
    await dispatch(productsLoadProducts(order.whenCutoff, order.periodId, { reload: true }, menus))

    const orderRecipeIds = getUserOrderRecipeIds(immutableOrderDetails)
    const orderMenuStartDate = getOrderWhenStartDate(immutableOrderDetails)
    await dispatch(productsLoadRecipePairings(orderRecipeIds, orderMenuStartDate))
    dispatch(basketOrderLoad(orderId, immutableOrderDetails))
    dispatch({
      type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
      orderId,
      orderDetails: immutableOrderDetails,
    })
  } catch (err) {
    logger.error({ message: 'Error loading order data', errors: [err] })
  }
}

export const orderConfirmationProductTracking = (trackingData) => (dispatch) => {
  dispatch({
    type: actionTypes.BASKET_PRODUCT_TRACKING,
    trackingData: { actionType: trackingData.eventName, trackingData },
  })
}

export const marketBundleTracking = (action, trackingData) => (dispatch) => {
  dispatch({
    type: actionTypes.BUNDLE_PRODUCT_TRACKING,
    trackingData: {
      actionType: action,
      event_name: action,
      event_properties: trackingData && trackingData,
    },
  })
}

export const orderConfirmationUpdateOrderTracking = () => (dispatch, getState) => {
  const { basket, user } = getState()
  const orderId = basket.get('orderId')
  const basketOrderDetails = basket.get('orderDetails')
  const prices = basketOrderDetails.get('prices')
  const orderTotal = prices.get('total')
  const promoCode = prices.get('promoCode')
  const subscription = user.get('subscription')
  const subscriptionActive = subscription.get('state') === 'active'

  dispatch({
    type: actionTypes.ORDER_CONFIRMATION_EDITED_TRACKING,
    trackingData: {
      actionType: 'Order Edited',
      order_id: orderId,
      order_total: orderTotal,
      promo_code: promoCode,
      signup: false,
      subscription_active: subscriptionActive,
    },
  })
}
