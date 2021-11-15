import { actionTypes } from "actions/actionTypes"
import moment from "moment"
import {
  getAvailableDeliveryDays,
  getDeliveryTariffId,
  getNDDFeatureFlagVal,
  transformDaySlotLeadTimesToMockSlots
} from "utils/deliveries"
import { getNDDFeatureValue } from "selectors/features"
import { getUsersOrdersDaySlotLeadTimeIds } from "selectors/user"
import { basketDeliveryDaysReceive } from "actions/boxSummary/basketDeliveryDaysReceive"
import logger from "utils/logger"
import { fetchDeliveryDays } from "apis/deliveries/fetchDeliveryDays"

export const boxSummaryDeliveryDaysLoad = (cutoffDatetimeFrom, cutoffDatetimeUntil) => (
  async (dispatch, getState) => {
    const state = getState()
    const {auth, basket, menuCutoffUntil, user} = state

    dispatch(error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false))

    const postcode = basket.get('postcode') || null
    const cutoffUntil = cutoffDatetimeUntil
      ? moment.utc(cutoffDatetimeUntil).endOf('day').toISOString()
      : menuCutoffUntil

    const isNDDExperiment = getNDDFeatureFlagVal(getState())

    try {
      const accessToken = auth.get('accessToken')
      const cutoffDatetimeFromFormatted = moment.utc(cutoffDatetimeFrom).startOf('day').toISOString()
      const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(state))
      let {data: days} = await fetchDeliveryDays(accessToken, cutoffDatetimeFromFormatted, cutoffUntil, isNDDExperiment, deliveryTariffId, postcode)

      if (isNDDExperiment) {
        days = transformDaySlotLeadTimesToMockSlots(days)
      }

      const availableDeliveryDays = getAvailableDeliveryDays(days, cutoffDatetimeFrom, getUsersOrdersDaySlotLeadTimeIds(state))

      dispatch(basketDeliveryDaysReceive(availableDeliveryDays))
    } catch (err) {
      if (err.message !== 'do-not-deliver') {
        logger.error(err)
      }

      dispatch(error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, err.message))
    }
  }
)
