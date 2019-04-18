import Immutable from 'immutable'
import ordersApi from 'apis/orders'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import productActions from './products'
import { basketOrderLoad } from './basket'
import recipeActions from './recipes'
import actionTypes from './actionTypes'

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

export default {
  orderDetails, 
  orderConfirmationProductTracking
}
