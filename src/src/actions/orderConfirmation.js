import ordersApi from 'apis/orders'
import logger from 'utils/logger'
import productActions from './products'
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
      dispatch(productActions.productsLoadProducts(order.whenCutOff))
    }
    catch (err) {
      logger.error(err)
    }
  }
)
export default {
  orderDetails
}
