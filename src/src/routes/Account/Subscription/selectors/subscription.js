import { createSelector } from 'reselect'
import Immutable from 'immutable'

export const getUserFullName = ({ user }) => `${user.get('nameFirst')} ${user.get('nameLast')}`

const getUserSubscription = ({ user }) => user.get('subscription')

const getSubscriptionBox = ({ subscription }) => subscription.get('box')

const getBoxPrices = ({ menuBoxPrices }) => menuBoxPrices

const getDeliveryDaySlots = ({ day, dayKey }) => day.get('slots')
  .toJS()
  .map((slot) => ({
    id: slot.id,
    day: new Date(dayKey).getDay(),
    deliveryStartTime: slot.deliveryStartTime,
    deliveryEndTime: slot.deliveryEndTime,
  }))

export const getDeliveryDays = ({ boxSummaryDeliveryDays }) => boxSummaryDeliveryDays
  .keySeq()
  .toArray()
  .reduce((deliveryDays, dayKey) => {
    const day = boxSummaryDeliveryDays.get(dayKey)

    const slots = getDeliveryDaySlots({ day, dayKey })

    return [
      ...deliveryDays,
      ...slots,
    ]
  }, [])

export const getDeliveryDetails = createSelector(
  [getUserSubscription, getDeliveryDays],
  (userSubscription = Immutable.fromJS({}), deliveryDays) => ({
    deliveryFrequency: {
      defaultValue: userSubscription.get('interval'),
    },
    deliveryDays,
  })
)

export const getCurrentDeliverySlot = createSelector(
  [getUserSubscription],
  (userSubscription = Immutable.fromJS({})) => ({
    currentDeliverySlot: {
      day: userSubscription.get('deliveryslot') && userSubscription.get('deliveryslot').get('defaultDay'),
      number: userSubscription.get('deliveryslot') && userSubscription.get('deliveryslot').get('number'),
    },
  })
)

export const getBoxDetails = createSelector(
  [getSubscriptionBox, getBoxPrices],
  (subscriptionBox, boxPrices) => ({
    box: {
      numPortions: subscriptionBox.get('numPortions'),
      numRecipes: subscriptionBox.get('numRecipes'),
      dietaryPreference: {
        defaultValue: subscriptionBox.get('boxType'),
      },
      prices: boxPrices,
    },
  })
)

export const getUserDetails = createSelector(
  [getUserFullName, getUserSubscription],
  (userFullName, userSubscription = Immutable.fromJS({})) => ({
    userFullName,
    status: userSubscription.get('state'),
  })
)
