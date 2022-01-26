/**
 * API response type
 *
 * SubscriptionResponse = {
 *   boxType: string,
 *   createdAt: DateString,
 *   deliverySlotDay: number,
 *   deliverySlotEndTime: TimeString,
 *   deliverySlotStartTime: TimeString,
 *   interval: number,
 *   numPortions: number,
 *   numRecipes: number,
 *   status: string
 * }
 */

// Given (mapped subscription) returns function: (camelcased slot) => fits subscription?
const subscriptionSlotMatcher = (subscription) => (slot) => slot.defaultDay === subscription.deliverySlotDay
    && slot.deliveryStartTime === subscription.deliverySlotStartTime
    && slot.deliveryEndTime === subscription.deliverySlotEndTime

// Given mapped subscription and mapped (camelCased) deliveries, gets matching Core delivery slot ID
export const getSubscriptionDeliverySlot = (subscription, deliveries) => {
  const matchingDelivery = deliveries.find(
    delivery => delivery.slots.find(
      subscriptionSlotMatcher(subscription)
    )
  )

  const [ firstSlot ] = matchingDelivery.slots

  return firstSlot.coreSlotId
}

// Normalises subscription query response to a structure usable in the Redux store
export const mapSubscriptionPayload = (subscription) => ({
  // Avoiding spreads to be explicit about structure
  subscription: {
    interval: subscription.interval,
    state: subscription.status,
    deliverySlotDay: subscription.deliverySlotDay,
    deliverySlotStartTime: subscription.deliverySlotStartTime,
    deliverySlotEndTime: subscription.deliverySlotEndTime,
  },
  box: {
    boxType: subscription.boxType,
    numPortions: subscription.numPortions,
    numRecipes: subscription.numRecipes,
  },
  projected: [],
})

export const mapSubscriptionUpdateRequestPayload = (coreParameters, deliverySlots) => {
  const parametersCopy = {...coreParameters}
  if (parametersCopy.deliverySlotId) {
    const { deliveryStartTime, deliveryEndTime, defaultDay } = deliverySlots.find(
      ({ coreSlotId }) => coreSlotId === parametersCopy.deliverySlotId
    )
    parametersCopy.deliverySlotStartTime = deliveryStartTime
    parametersCopy.deliverySlotEndTime = deliveryEndTime
    parametersCopy.deliverySlotDay = defaultDay
    delete parametersCopy.deliverySlotId
  }

  // ensuring that parameters have correct type to pass server-side validation
  if (parametersCopy.numPortions) {
    parametersCopy.numPortions = Number.parseInt(parametersCopy.numPortions, 10)
  }
  if (parametersCopy.numRecipes) {
    parametersCopy.numRecipes = Number.parseInt(parametersCopy.numRecipes, 10)
  }
  if (parametersCopy.interval) {
    parametersCopy.interval = Number.parseInt(parametersCopy.interval, 10)
  }

  return parametersCopy
}

// Normalises subscription command response to a structure usable in the Account Subscription Context store
export const mapSubscriptionUpdatePayload = (subscription, slots) => {
  const slot = slots.find(
    subscriptionSlotMatcher(subscription)
  )

  // Avoiding spreads to be explicit about structure
  return {
    interval: subscription.interval,
    state: { description: subscription.status },
    deliverySlotDay: subscription.deliverySlotDay,
    deliverySlotStartTime: subscription.deliverySlotStartTime,
    deliverySlotEndTime: subscription.deliverySlotEndTime,
    box: {
      boxType: subscription.boxType,
      numPortions: subscription.numPortions,
      numRecipes: subscription.numRecipes,
    },
    slot: {
      id: slot.coreSlotId,
      defaultDay: slot.defaultDay,
      cutoffDay: slot.cutoffDay,
      cutoffTime: slot.cutoffTime,
      deliveryStart: slot.deliveryStartTime,
      deliveryEnd: slot.deliveryEndTime,
      default: slot.isDefault,
      deliveryPrice: slot.deliveryPrice,
    },
    projected: [],
  }
}
