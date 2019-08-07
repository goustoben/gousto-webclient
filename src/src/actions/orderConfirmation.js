import Immutable from 'immutable'
import { push } from 'react-router-redux'

import config from 'config/routes'
import ordersApi from 'apis/orders'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import { redirect } from 'utils/window'
import { basketOrderLoad } from 'actions/basket'
import { getAffiliateTrackingData } from 'utils/order'
import { trackAffiliatePurchase } from 'actions/tracking'
import { productsLoadCategories, productsLoadProducts, productsLoadStock } from 'actions/products'
import { orderCheckPossibleDuplicate } from './order'
import recipeActions from './recipes'
import tempActions from './temp'
import actionTypes from './actionTypes'

export const orderConfirmationRedirect = (orderId, orderAction) => (
  (dispatch, getState) => {
    dispatch(orderDetails(orderId))

    const confirmationUrl = config.client.orderConfirmation.replace(':orderId', orderId)
    dispatch(orderCheckPossibleDuplicate(orderId))
    dispatch(push((orderAction) ? `${confirmationUrl}?order_action=${orderAction}` : confirmationUrl))
    dispatch(tempActions.temp('showHeader', true))
  }
)

export const orderDetails = (orderId) => (
  async (dispatch, getState) => {
    const { basket } = getState()
    const accessToken = getState().auth.get('accessToken')
    try {
      dispatch(productsLoadCategories())
      dispatch(productsLoadStock())
      const { data: order } = await ordersApi.fetchOrder(accessToken, orderId)
      const immutableOrderDetails = Immutable.fromJS(order)
      const orderRecipeIds = userUtils.getUserOrderRecipeIds(immutableOrderDetails)

      trackAffiliatePurchase(
        getAffiliateTrackingData(
          'EXISTING',
          immutableOrderDetails,
          basket,
        )
      )

      dispatch(recipeActions.recipesLoadRecipesById(orderRecipeIds))
      await dispatch(productsLoadProducts(order.whenCutOff, order.periodId))
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
