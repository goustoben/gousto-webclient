import { productCanBeAdded } from "utils/basketProductLimits"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"

export const basketProductAdd = (productId, view = null, force = false) => (
  (dispatch, getState) => {
    const product = getState().products.get(productId, false)

    if (product) {
      const state = getState()
      if (force || productCanBeAdded(productId, state.basket, state.products, state.productsStock, state.productsCategories)) {
        dispatch({
          type: actionTypes.BASKET_PRODUCT_ADD,
          productId,
          unsaved: !force,
          trackingData: force ? undefined : {
            actionType: actionTypes.BASKET_PRODUCT_ADD,
            productId,
            view,
          },
        })

        if (!force) {
          dispatch({
            type: actionTypes.PRODUCTS_STOCK_CHANGE,
            stock: {[productId]: -1},
          })
        }
      } else {
        logger.error({message: `Cannot add product ${productId} to basket`})
      }
    } else {
      logger.error({message: `Cannot add product to basket since ${productId} not found in product store`})
    }
  }
)
