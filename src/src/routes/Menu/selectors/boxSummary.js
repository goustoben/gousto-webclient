import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getIsAuthenticated } from 'selectors/auth'
import { getLogoutUserDisabledSlots } from 'selectors/features'
import { getUserOpenOrders, getUserSubscriptionState } from 'selectors/user'
import { getBoxSummaryDeliveryDays } from 'selectors/root'

const isOneOffSlotActiveForUser = ({ daySlot, userSubscriptionState }) => {
  switch (userSubscriptionState) {
  case 'inactive':
    return daySlot.get('activeForNonSubscribersOneOff')
  case 'active':
    return daySlot.get('activeForSubscribersOneOff')
  default:
    return true
  }
}

export const getDisabledSlots = createSelector(
  [
    getBoxSummaryDeliveryDays,
    getUserSubscriptionState,
    getUserOpenOrders
  ],
  (boxSummaryDeliveryDays, userSubscriptionState, userOpenOrders) => (
    boxSummaryDeliveryDays.reduce((acc, deliveryDay) => {
      const daySlots = deliveryDay.get('daySlots')
      const hasAnOpenOrder = userOpenOrders.some(order => (
        order.get('deliveryDate').includes(deliveryDay.get('date'))
      ))

      const disabledSlot = deliveryDay.get('slots').filter(slot => {
        const daySlot = daySlots.filter(daySlotItem => (
          daySlotItem.get('slotId') === slot.get('id')
        )).first()

        return isOneOffSlotActiveForUser({
          daySlot,
          userSubscriptionState,
        }) === false && hasAnOpenOrder === false
      })

      if (disabledSlot.size > 0) {
        return acc.push(disabledSlot)
      }

      return acc
    }, Immutable.List())
  )
)

export const getDisabledSlotDates = createSelector(
  [getDisabledSlots],
  (disabledSlots) => (
    disabledSlots.reduce((disabledSlotDates, disabledSlot, slotDate) => {
      disabledSlot.forEach(slot => {
        const hourEndTime = slot.get('deliveryEndTime').slice(0, 2)
        const hourStartTime = slot.get('deliveryStartTime').slice(0, 2)
        const formattedSlot = `${slotDate}_${hourStartTime}-${hourEndTime}`

        disabledSlotDates.push(formattedSlot)
      })

      return disabledSlotDates
    }, []).toString()
  )
)

export const getDisabledSlotsBasedOnAuthStatus = createSelector(
  [
    getIsAuthenticated,
    getDisabledSlotDates,
    getLogoutUserDisabledSlots,
  ],
  (isUserAuthenticated, disabledSlots, logoutDisabledSlots) => (
    (isUserAuthenticated) ? disabledSlots : logoutDisabledSlots
  ))

export const getOneOffSlotAvailableSlots = createSelector(
  [
    getBoxSummaryDeliveryDays,
    getUserSubscriptionState
  ],
  (boxSummaryDeliveryDays, userSubscriptionState) => (
    boxSummaryDeliveryDays.filter(deliveryDay => (
      isOneOffSlotActiveForUser({
        daySlot: deliveryDay.get('daySlots').first(),
        userSubscriptionState,
      })
    ))
  ))
