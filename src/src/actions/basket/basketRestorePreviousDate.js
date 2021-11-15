import { basketDateChange } from "actions/basket/basketDateChange"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { menuLoadMenu } from "actions/menu/menuLoadMenu"
import { menuLoadStock } from "actions/menu/menuLoadStock"

export const basketRestorePreviousDate = () => (
  (dispatch, getState) => {
    const {basket} = getState()
    const slotId = basket.get('prevSlotId')
    dispatch(basketDateChange(basket.get('prevDate')))
    dispatch({
      type: actionTypes.BASKET_SLOT_CHANGE,
      slotId,
    })
    dispatch(menuLoadMenu())
    dispatch(menuLoadStock())
    dispatch({
      type: actionTypes.TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE,
      trackingData: {
        actionType: trackingKeys.undoDeliveryOptionsChange,
      }
    })
  }
)
