import Immutable from 'immutable'
import { push } from 'react-router-redux'

import config from 'config/routes'
import { fetchOrder } from 'apis/orders'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import { basketOrderLoad } from 'actions/basket'
import { productsLoadCategories, productsLoadProducts, productsLoadStock } from 'actions/products'
import { orderCheckPossibleDuplicate } from './order'
import { getAuthUserId, getAccessToken } from '../selectors/auth'
import { fetchSimpleMenu } from '../routes/Menu/fetchData/menuApi'
import recipeActions from './recipes'
import { actionTypes } from './actionTypes'
import { mockOrders } from '../nourishised'

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
    const { data: order } = await fetchOrder(accessToken, orderId)
    mockOrders([order])

    const { data: menus } = await fetchSimpleMenu(accessToken, userId)
    const immutableOrderDetails = Immutable.fromJS(order)
    const orderRecipeIds = userUtils.getUserOrderRecipeUuIds(immutableOrderDetails)
    dispatch(recipeActions.recipesLoadFromMenuRecipesById(orderRecipeIds))
    await dispatch(productsLoadProducts(order.whenCutoff, order.periodId, { reload: true }, menus))

    dispatch(basketOrderLoad(orderId, immutableOrderDetails))
    dispatch({
      type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
      orderId,
      orderDetails: immutableOrderDetails,
    })
  } catch (err) {
    logger.error(err)
  }
}

export const orderConfirmationProductTracking = (productId, added) => (dispatch) => {
  dispatch({
    type: actionTypes.BASKET_PRODUCT_TRACKING,
    trackingData: {
      actionType: added ? 'MarketProduct Added' : 'MarketProduct Removed',
      product_id: productId,
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
