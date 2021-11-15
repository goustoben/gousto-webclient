import { getAccessToken, getAuthUserId } from 'selectors/auth'
import Immutable from 'immutable'
import userUtils from 'utils/user'
import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { basketOrderLoad } from 'actions/basket/basketOrderLoaded'
import { productsLoadCategories } from "actions/products/productsLoadCategories"
import { productsLoadProducts } from "actions/products/productsLoadProducts"
import { productsLoadStock } from "actions/products/productsLoadStock"
import { recipesLoadFromMenuRecipesById } from "actions/recipes/recipesLoadFromMenuRecipesById"
import { fetchOrder } from "apis/orders/fetchOrder"
import { fetchSimpleMenu } from "routes/Menu/fetchData/apis/fetchSimpleMenu"

export const orderDetails = (orderId) => (
  async (dispatch, getState) => {
    const accessToken = getAccessToken(getState())
    const userId = getAuthUserId(getState())

    try {
      dispatch(productsLoadCategories())
      dispatch(productsLoadStock())
      const {data: order} = await fetchOrder(accessToken, orderId)
      const {data: menus} = await fetchSimpleMenu(accessToken, userId)
      const immutableOrderDetails = Immutable.fromJS(order)
      const orderRecipeIds = userUtils.getUserOrderRecipeUuIds(immutableOrderDetails)
      dispatch(recipesLoadFromMenuRecipesById(orderRecipeIds))
      await dispatch(productsLoadProducts(order.whenCutoff, order.periodId, {reload: true}, menus))

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
)
