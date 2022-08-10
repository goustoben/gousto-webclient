import { basketSlotChange } from 'actions/basket'
import tempActions from 'actions/temp'
import fetchData from 'routes/Menu/fetchData'
import { getDisabledSlotDates } from 'routes/Menu/selectors/boxSummary'
import { getIsAuthenticated } from 'selectors/auth'
import { getSlot } from 'utils/deliveries'
import { getDeliveryDaysAndSlots, getTempDeliveryOptions } from 'utils/deliverySlotHelper'

import { actionTypes } from './actionTypes'

export const trackDeliverySlotDropDownOpened = (date, dayOffset, deliverySlotId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliverySlotDropDown Opened',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId,
    },
  })
}

export const trackDeliveryDayEdited = (date, dayOffset, deliverySlotId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliveryDay Edited',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId,
    },
  })
}

export const trackDeliverySlotEdited = (date, dayOffset, deliverySlotId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliverySlot Edited',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId,
    },
  })
}

export const trackDeliveryPreferenceModalViewed =
  (date, dayOffset, deliverySlotId) => (dispatch) => {
    dispatch({
      type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
      trackingData: {
        actionType: 'DeliveryPreferenceModal Viewed',
        date,
        day_offset: dayOffset,
        delivery_slot_id: deliverySlotId,
      },
    })
  }

export const trackDeliveryPreferenceSelected =
  (date, dayOffset, deliverySlotId, deliveryPreference) => (dispatch) => {
    dispatch({
      type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
      trackingData: {
        actionType: 'DeliveryPreference Selected',
        date,
        day_offset: dayOffset,
        delivery_slot_id: deliverySlotId,
        delivery_preference: deliveryPreference,
      },
    })
  }

export const trackDeliveryPreferenceModalClosed =
  (date, dayOffset, deliverySlotId, deliveryPreference) => (dispatch) => {
    dispatch({
      type: actionTypes.DELIVERY_PREFERENCE_MODAL_CLOSED,
      trackingData: {
        actionType: 'DeliveryPreferenceModal Closed',
        date,
        day_offset: dayOffset,
        delivery_slot_id: deliverySlotId,
        delivery_preference: deliveryPreference,
      },
    })
  }

export const preselectFreeDeliverySlot = (dispatch, getState) => {
  const slotId = getState().basket.get('slotId')

  if (slotId) {
    return
  }

  const date = getState().basket.get('date')
  const deliveryDays = getState().boxSummaryDeliveryDays
  const slotTimeId = getSlot(deliveryDays, date, slotId)

  if (!slotTimeId) {
    return
  }
  dispatch(basketSlotChange(slotTimeId.get('id')))
}

export const setTempDeliveryOptions = (date, orderId) => (dispatch, getState) => {
  console.log(`>>>>>>>> date: ${date}`)

  if (orderId) {
    dispatch(tempActions.temp('date', date))
    dispatch(tempActions.temp('orderId', orderId))

    return
  }

  const state = getState()
  const { user } = state
  const isAuthenticated = getIsAuthenticated(state)
  const disabledSlots = getDisabledSlotDates(state)
  const { tempDate, tempSlotId, deliveryDays } = getTempDeliveryOptions(state)
  const helperProps = {
    disabledSlots,
    isAuthenticated,
    isSubscriptionActive: user.getIn(['subscription', 'state'], false),
    userOrders: user.get('orders'),
    tempDate,
    tempSlotId,
    deliveryDaysProps: deliveryDays,
  }
  const { slots } = getDeliveryDaysAndSlots(date, helperProps)
  const unblockedSlots = slots[date].filter((slot) => !slot.disabled)
  const slotId = unblockedSlots[0] && unblockedSlots[0].value
  dispatch(tempActions.temp('slotId', slotId))
  dispatch(tempActions.temp('date', date))
  dispatch(tempActions.temp('orderId', undefined))

  console.log(`>>>>>>>> date before fetching: ${date}`)
  dispatch(
    fetchData({ query: {}, params: {} }, true, undefined, undefined, {
      addRecipe: () => {},
      date,
    }),
  )
}

export const deliveriesActions = {
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  trackDeliveryPreferenceModalViewed,
  trackDeliveryPreferenceSelected,
  trackDeliveryPreferenceModalClosed,
  preselectFreeDeliverySlot,
  setTempDeliveryOptions,
}
