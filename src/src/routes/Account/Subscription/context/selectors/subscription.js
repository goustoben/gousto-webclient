import { createSelector } from 'reselect'

import {
  getNumPortions,
  getNumRecipes,
  getDietaryPreference
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

export const getSubscriptionUpdatePayload = createSelector(
  [getNumPortions, getNumRecipes, getDietaryPreference, getCurrentDeliverySlot, getDeliveryFrequency],
  (numPortions, numRecipes, dietaryPreference, currentDeliverySlot, deliveryFrequency) => ({
    num_portions: numPortions,
    num_recipes: numRecipes,
    box_type: dietaryPreference,
    delivery_slot_id: currentDeliverySlot.coreSlotId,
    interval: deliveryFrequency
  })
)
