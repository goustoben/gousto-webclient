import { actionTypes } from "actions/actionTypes"
import { basketDateChange } from "actions/basket/basketDateChange"
import { basketSlotChange } from "actions/basket/basketSlotChange"
import { getCutoffForFirstAvailableDate } from "utils/deliveries"
import { menuLoadMenu } from "actions/menu/menuLoadMenu"
import { menuLoadStock } from "actions/menu/menuLoadStock"

export const boxSummaryDeliverySlotChosen = ({date, slotId, displayMenuForFirstWeekOnly}) => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.MENU_FETCH_DATA, true))
    dispatch(basketDateChange(date))
    dispatch(basketSlotChange(slotId))

    const cutoffDateTime = displayMenuForFirstWeekOnly ? getCutoffForFirstAvailableDate(getState()) : null

    await Promise.all([
      dispatch(menuLoadMenu(cutoffDateTime)),
      dispatch(menuLoadStock()),
    ])
    dispatch(pending(actionTypes.MENU_FETCH_DATA, false))
  }
)
