import Immutable from 'immutable'
import ordersApi from 'apis/orders'
import logger from 'utils/logger'
import productActions from './products'
import { basketOrderItemsLoad } from './basket'
import actionTypes from './actionTypes'

export const orderDetails = (orderId) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    try {
      dispatch(productActions.productsLoadCategories())
      dispatch(productActions.productsLoadStock())
      const {data: order} = await ordersApi.fetchOrder(accessToken, orderId)
      dispatch({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId,
        orderDetails: order,
      })
      await dispatch(productActions.productsLoadProducts(order.whenCutOff))
      dispatch(basketOrderItemsLoad(orderId, Immutable.fromJS(order)))
    }
    catch (err) {
      logger.error(err)
    }
  }
)
export default {
  orderDetails
}
