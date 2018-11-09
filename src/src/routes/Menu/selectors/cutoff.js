import { createSelector } from 'reselect'

import { getIsAdmin } from 'selectors/auth'
import { getTempCutoffDate } from 'selectors/temp'
import { getBasket, getBoxSummaryDeliveryDays, getMenuCutoffUntil } from 'selectors/root'
import { getCutoffs, cutoffDateTimeNow } from 'utils/deliveries'

export const getPreviousCutoffDate = createSelector(
  [getBasket, getBoxSummaryDeliveryDays],
  (basket, boxSummaryDeliveryDays) => (
    getCutoffs(basket, boxSummaryDeliveryDays)[1]
  )
)

export const getCutoffDate = createSelector(
  [getBasket, getBoxSummaryDeliveryDays, getIsAdmin, getTempCutoffDate, getMenuCutoffUntil],
  (basket, boxSummaryDeliveryDays, isAdmin, tempCutoffDate, menuCutoffUntil) => {
    let [cutoffDate] = getCutoffs(basket, boxSummaryDeliveryDays)
    if (!cutoffDate || isAdmin) {
      cutoffDate = tempCutoffDate || menuCutoffUntil
    }
    if (!cutoffDate) {
      cutoffDate = cutoffDateTimeNow()
    }

    return cutoffDate
  }
)

export default {
  getPreviousCutoffDate,
  getCutoffDate,
}
