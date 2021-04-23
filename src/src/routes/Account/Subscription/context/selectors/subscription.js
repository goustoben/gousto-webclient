import { createSelector } from 'reselect'

import {
  getNumPortions,
  getDietaryPreference,
  getMealsPerBox
} from './box'

import { getCurrentDeliverySlot, getDeliveryFrequency } from './deliveries'

export const getSubscription = ({ subscription }) => (subscription || {})

export const getIsSubscriptionLoaded = createSelector(
  getSubscription,
  (subscription) => Boolean(Object.keys(subscription).length)
)

export const getIsSubscriptionActive = createSelector(
  getSubscription,
  (subscription) => (subscription.status === 'active')
)

export const getShowResubscriptionModal = createSelector(
  getSubscription,
  (subscription) => subscription.showResubscriptionModal
)

export const getSubscriptionUpdatePayload = createSelector(
  [getNumPortions, getMealsPerBox, getDietaryPreference, getCurrentDeliverySlot, getDeliveryFrequency],
  (numPortions, mealsPerBox, dietaryPreference, currentDeliverySlot, deliveryFrequency) => ({
    num_portions: numPortions,
    num_recipes: mealsPerBox,
    box_type: dietaryPreference,
    delivery_slot_id: currentDeliverySlot.coreSlotId,
    interval: deliveryFrequency
  })
)

export const getSubscriptionUpdateV2Payload = createSelector(
  [
    getNumPortions,
    getMealsPerBox,
    getDietaryPreference,
    getDeliveryFrequency,
    getCurrentDeliverySlot,
  ],
  (numPortions, mealsPerBox, dietaryPreference, deliveryFrequency, currentDeliverySlot) => ({
    numRecipes: Number.parseInt(mealsPerBox, 10),
    numPortions: Number.parseInt(numPortions, 10),
    boxType: dietaryPreference,
    interval: Number.parseInt(deliveryFrequency, 10),
    intervalUnit: 'weeks',
    deliverySlotStartTime: currentDeliverySlot.deliveryStartTime,
    deliverySlotEndTime: currentDeliverySlot.deliveryEndTime,
    deliverySlotDay: currentDeliverySlot.defaultDay,
  })
)
