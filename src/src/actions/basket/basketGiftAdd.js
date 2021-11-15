import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"

export const basketGiftAdd = (giftId, type = '') => (
  (dispatch, getState) => {
    if (type.toLowerCase() === 'product') {
      if (getState().products.has(giftId)) {
        dispatch({
          type: actionTypes.BASKET_GIFT_ADD,
          giftId,
        })
      } else {
        logger.error({message: `Cannot add gift to basket since ${giftId} not found in products store`})
      }
    } else {
      logger.info(`${type} gifts cannot be added to basket`)
    }
  }
)
