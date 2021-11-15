import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"

export const basketProductRemove = (productId, view) => (
  (dispatch, getState) => {
    const product = getState().products.get(productId, false)

    if (product) {
      dispatch({
        type: actionTypes.BASKET_PRODUCT_REMOVE,
        productId,
        unsaved: true,
        trackingData: {
          actionType: actionTypes.BASKET_PRODUCT_REMOVE,
          productId,
          view,
        },
      })

      dispatch({
        type: actionTypes.PRODUCTS_STOCK_CHANGE,
        stock: {[productId]: 1},
      })
    } else {
      logger.error({message: `Cannot remove product from basket since ${productId} not found in product store`})
    }
  }
)
