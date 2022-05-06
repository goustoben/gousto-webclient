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

const isOneOffSlotActiveForSignup = ({ daySlot }) => daySlot.get('activeForSignups', true)

const isOneOffSlotActive = ({ isUserAuthenticated, daySlot, userSubscriptionState }) => {
  switch (isUserAuthenticated) {
    case true:
      return isOneOffSlotActiveForUser({ daySlot, userSubscriptionState })
    case false:
      return isOneOffSlotActiveForSignup({ daySlot })
    default:
      return true
  }
}

export const getDisabledSlots = createSelector(
  [getBoxSummaryDeliveryDays, getUserSubscriptionState, getUserOpenOrders, getIsAuthenticated],
  (boxSummaryDeliveryDays, userSubscriptionState, userOpenOrders, isUserAuthenticated) =>
    boxSummaryDeliveryDays.reduce((acc, deliveryDay) => {
      const daySlots = deliveryDay.get('daySlots')

      const hasAnOpenOrder = userOpenOrders.some((order) =>
        order.get('deliveryDate').includes(deliveryDay.get('date')),
      )

      const disabledSlot = deliveryDay
        .get('slots')
        .map((slot) => slot.set('date', deliveryDay.get('date')))
        .filter((slot) => {
          const daySlot = daySlots
            .filter((daySlotItem) => daySlotItem.get('slotId') === slot.get('id'))
            .first()

          return (
            isOneOffSlotActive({
              daySlot,
              userSubscriptionState,
              isUserAuthenticated,
            }) === false && hasAnOpenOrder === false
          )
        })

      if (disabledSlot.size > 0) {
        return acc.concat(disabledSlot)
      }

      return acc
    }, Immutable.List()),
)

export const createDisabledSlotId = (slot, deliveryDate) => {
  const deliveryStartTime = slot.get('deliveryStartTime')
  const deliveryEndTime = slot.get('deliveryEndTime')
  const date = deliveryDate || slot.get('date')

  if (!deliveryStartTime || !deliveryEndTime) {
    return ''
  }

  const slotStartTime = deliveryStartTime.substring(0, 2)
  const slotEndTime = deliveryEndTime.substring(0, 2)
  const disabledSlotId = `${date}_${slotStartTime}-${slotEndTime}`

  return disabledSlotId
}

// Returns an array ["2021-03-08_08-19"]
export const getDisabledSlotDates = createSelector([getDisabledSlots], (disabledSlots) =>
  disabledSlots.map((slot) => createDisabledSlotId(slot)).filter((id) => id !== ''),
)

export const getOneOffSlotAvailableSlots = createSelector(
  [getBoxSummaryDeliveryDays, getUserSubscriptionState, getIsAuthenticated],
  (boxSummaryDeliveryDays, userSubscriptionState, isUserAuthenticated) => {
    const availableBoxSummaryDeliveryDays = boxSummaryDeliveryDays.filter((deliveryDay) => {
      const availableSlots = deliveryDay.get('daySlots').filter((daySlot) =>
        isOneOffSlotActive({
          daySlot,
          userSubscriptionState,
          isUserAuthenticated,
        }),
      )

      return availableSlots.size > 0
    })

    return availableBoxSummaryDeliveryDays
  },
)

export const userHasAvailableSlots = createSelector(
  [getUserOpenOrders, getOneOffSlotAvailableSlots],
  (userOpenOrders, oneOffSlots) => userOpenOrders.size > 0 || oneOffSlots.size > 0,
)
