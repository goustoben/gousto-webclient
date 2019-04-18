import Immutable from 'immutable'
import { push } from 'react-router-redux'

import config from 'config/routes'
import ordersApi from 'apis/orders'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import { redirect } from 'utils/window'
import { getOrderConfirmation } from 'selectors/features'
import { basketOrderLoad } from './basket'
import productActions from './products'
import recipeActions from './recipes'
import tempActions from './temp'
import actionTypes from './actionTypes'

export const orderConfirmationRedirect = (orderId, orderAction) => (
  (dispatch, getState) => {
    if (getOrderConfirmation(getState())) {
      dispatch(orderDetails(orderId))

      const summaryUrl = config.client.orderConfirmation.replace(':orderId', orderId)
      dispatch(push((orderAction) ? `${summaryUrl}?order_action=${orderAction}` : summaryUrl))
      dispatch(tempActions.temp('showHeader', true))
    } else {
      const summaryUrl = config.client.orderSummary.replace(':orderId', orderId)
      redirect((orderAction) ? `${summaryUrl}?order_action=${orderAction}` : summaryUrl)
    }
  }
)

export const orderDetails = (orderId) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    try {
      dispatch(productActions.productsLoadCategories())
      dispatch(productActions.productsLoadStock())
      const {data: order} = await ordersApi.fetchOrder(accessToken, orderId)
      const immutableOrderDetails = Immutable.fromJS(order)
      const orderRecipeIds = userUtils.getUserOrderRecipeIds(immutableOrderDetails)

      dispatch(recipeActions.recipesLoadRecipesById(orderRecipeIds))
      await dispatch(productActions.productsLoadProducts(order.whenCutOff))
      dispatch(basketOrderLoad(orderId, immutableOrderDetails))
      dispatch({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId,
        orderDetails: immutableOrderDetails,
      })
    }
    catch (err) {
      logger.error(err)
    }
  }
)

export const orderConfirmationProductTracking = (productId, added) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.BASKET_PRODUCT_TRACKING,
      trackingData: {
        actionType: added ? 'MarketProduct Added' : 'MarketProduct Removed',
        product_id: productId,
      },
    })
  }
)

export const orderConfirmationUpdateOrderTracking = () => (
  (dispatch, getState) => {
    const { basket, user } = getState()
    const orderId = basket.get('orderId')
    const basketOrderDetails = basket.get('orderDetails')
    const prices = basketOrderDetails.get('prices')
    const orderTotal = prices.get('total')
    const promoCode = prices.get('promoCode')
    const subscription = user.get('subscription')
    const subscriptionActive = subscription.get('state') === 'active'
    const orderNumber = basketOrderDetails.get('number')

    dispatch({
      type: actionTypes.ORDER_CONFIRMATION_EDITED_TRACKING,
      trackingData: {
        actionType: 'Order Edited',
        order_id: orderId,
        order_total: orderTotal,
        promo_code: promoCode,
        signup: false,
        subscription_active: subscriptionActive,
        subscription_order: orderNumber,
      },
    })
  }
)
