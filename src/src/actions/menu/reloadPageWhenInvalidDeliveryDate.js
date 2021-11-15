import { get, set } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { handleReloadMenuError } from "actions/menu/handleReloadMenuError"
import { boxSummaryDeliverySlotChosen } from "actions/boxSummary/boxSummaryDeliverySlotChosen"
import logger from "utils/logger"

export function reloadPageWhenInvalidDeliveryDate({dispatch, getState}) {
  // if we already reloaded dont reload and remove cookie
  if (get(Cookies, 'reload_invalid_delivery_date') === '1') {
    handleReloadMenuError({dispatch})

    return
  }

  try {
    const firstAvailableDate = Object.keys(getState().boxSummaryDeliveryDays.toJS()).sort().shift()
    const slotId = getState().boxSummaryDeliveryDays.getIn([firstAvailableDate, 'slots']).toJS().shift().id

    set(Cookies, 'reload_invalid_delivery_date', '1', 1)
    dispatch(boxSummaryDeliverySlotChosen({date: firstAvailableDate, slotId}))
  } catch (err) {
    logger.error({message: err.message, extra: {error: err}})
    handleReloadMenuError({dispatch})
  }
}
