import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import {
  getAvailableDeliveryDays,
  getDeliveryTariffId,
  getNDDFeatureFlagVal,
  transformDaySlotLeadTimesToMockSlots
} from "utils/deliveries"
import { getNDDFeatureValue } from "selectors/features"
import logger from "utils/logger"
import { fetchDeliveryDays } from "apis/deliveries/fetchDeliveryDays"

export const orderGetDeliveryDays = (cutoffDatetimeFrom, cutoffDatetimeUntil, addressId, orderId) => (
  async (dispatch, getState) => {
    const state = getState()
    const {user} = state
    dispatch(error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, null))
    dispatch(pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, true))

    const postcode = user.getIn(['addresses', addressId, 'postcode'])
    const isNDDExperiment = !!getNDDFeatureFlagVal(state)
    const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(state))

    try {
      let {data: days} = await fetchDeliveryDays(null, cutoffDatetimeFrom, cutoffDatetimeUntil, isNDDExperiment, deliveryTariffId, postcode)

      if (isNDDExperiment) {
        days = transformDaySlotLeadTimesToMockSlots(days)
      }

      const availableDays = getAvailableDeliveryDays(days)
      dispatch({
        type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
        availableDays,
        orderId,
      })
    } catch (err) {
      if (err.message !== 'do-not-deliver') {
        logger.error(err)
      }
      dispatch(error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, err.message))
    } finally {
      dispatch(pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, false))
    }
  }
)
