import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getIsAuthenticated } from 'selectors/auth'
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

const isOneOffSlotActiveForSignup = ({ daySlot }) => (
  daySlot.get('activeForSignups', true)
)

const isOneOffSlotActive = ({ isUserAuthenticated, daySlot, userSubscriptionState }) => {
  switch (isUserAuthenticated) {
  case true:
    return isOneOffSlotActiveForUser({daySlot, userSubscriptionState})
  case false:
    return isOneOffSlotActiveForSignup({daySlot})
  default:
    return true
  }
}

export const getDisabledSlots = createSelector(
  [
    getBoxSummaryDeliveryDays,
    getUserSubscriptionState,
    getUserOpenOrders,
    getIsAuthenticated
  ],
  (boxSummaryDeliveryDays, userSubscriptionState, userOpenOrders, isUserAuthenticated) => (
    boxSummaryDeliveryDays.reduce((acc, deliveryDay) => {
      const daySlots = deliveryDay.get('daySlots')

      const hasAnOpenOrder = userOpenOrders.some(order => (
        order.get('deliveryDate').includes(deliveryDay.get('date'))
      ))

      const disabledSlot = deliveryDay.get('slots')
        .map(slot => (
          slot.set('date', deliveryDay.get('date'))
        ))
        .filter(slot => {
          const daySlot = daySlots.filter(daySlotItem => (
            daySlotItem.get('slotId') === slot.get('id')
          )).first()

          return isOneOffSlotActive({
            daySlot,
            userSubscriptionState,
            isUserAuthenticated,
          }) === false && hasAnOpenOrder === false
        })

      if (disabledSlot.size > 0) {
        return acc.push(disabledSlot.first())
      }

      return acc
    }, Immutable.List())
  )
)

export const getDisabledSlotDates = createSelector(
  [getDisabledSlots],
  (disabledSlots) => (
    disabledSlots.reduce((disabledSlotDates, slot) => {
      const hourEndTime = slot.get('deliveryEndTime').slice(0, 2)
      const hourStartTime = slot.get('deliveryStartTime').slice(0, 2)
      const formattedSlot = `${slot.get('date')}_${hourStartTime}-${hourEndTime}`

      disabledSlotDates.push(formattedSlot)

      return disabledSlotDates
    }, []).toString()
  )
)

export const getOneOffSlotAvailableSlots = createSelector(
  [
    getBoxSummaryDeliveryDays,
    getUserSubscriptionState,
    getIsAuthenticated
  ],
  (boxSummaryDeliveryDays, userSubscriptionState, isUserAuthenticated) => (
    boxSummaryDeliveryDays.filter(deliveryDay => (
      isOneOffSlotActive({
        daySlot: deliveryDay.get('daySlots').first(),
        userSubscriptionState,
        isUserAuthenticated,
      })
    ))
  ))

export const userHasAvailableSlots = createSelector([
  getUserOpenOrders,
  getOneOffSlotAvailableSlots,
], (userOpenOrders, oneOffSlots) => (
  userOpenOrders.size > 0 || oneOffSlots.size > 0
))
