import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { basketReset } from "actions/basket/basketReset"
import { basketIdChange } from "actions/basket/basketIdChange"
import {
  basketOrderItemsLoad,
  basketOrderLoaded as basketOrderLoadedOriginal
} from "actions/basket/basketOrderItemsLoad"

export const basketOrderLoaded = (orderId) => (
  (dispatch, getState) => {
    const editBox = getState().basket.get('recipes').size !== 0
    dispatch({
      type: actionTypes.BASKET_ORDER_LOADED,
      orderId,
      editBox,
    })
  }
)
export const basketOrderLoad = (orderId, order = null) => (
  (dispatch, getState) => {
    if (getState().basket.get('orderId') !== orderId) {
      dispatch(basketReset())
      dispatch(basketIdChange(orderId))
      dispatch(basketOrderItemsLoad(orderId, order))
      logger.info(`Basket loaded order: ${orderId}`)
    } else {
      logger.info(`Order already loaded into current basket: ${orderId}`)
    }
    dispatch(basketOrderLoadedOriginal(orderId))
  }
)
