export const mapSubscriptionAndDeliverySlots = (mappedSubscription, deliveries) => {
  const [deliverySlot] = deliveries.find((delivery) => (
    delivery.slots.find((slot) => {
      const { subscription } = mappedSubscription

      return slot.default_day === subscription.delivery_slot_day
        && slot.delivery_start_time === subscription.delivery_slot_start_time
        && slot.delivery_end_time === subscription.delivery_slot_end_time
    })
  )).slots

  return {
    ...mappedSubscription,
    subscription: {
      ...mappedSubscription.subscription,
      delivery_slot_id: deliverySlot.core_slot_id
    },
  }
}

// todo TG-4896 rename these + do any necessary refactoring
export const mapSubscriptionV2Payload = (subscription) => ({
  subscription: {
    interval: subscription.interval,
    state: subscription.status,
    delivery_slot_day: subscription.deliverySlotDay,
    delivery_slot_start_time: subscription.deliverySlotStartTime,
    delivery_slot_end_time: subscription.deliverySlotEndTime,
  },
  box: {
    box_type: subscription.boxType,
    num_portions: subscription.numPortions,
    num_recipes: subscription.numRecipes,
  },
  projected: [],
})

export const mapSubscriptionUpdateV2RequestPayload = (coreParameters, deliverySlots) => {
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

export const mapSubscriptionUpdateV2Payload = (subscription, slots) => {
  const appropriateSlot = slots.find(
    (slot) =>
      slot.defaultDay === subscription.deliverySlotDay
      && slot.deliveryStartTime === subscription.deliverySlotStartTime
      && slot.deliveryEndTime === subscription.deliverySlotEndTime
  )

  return {
    interval: subscription.interval,
    state: { description: subscription.status },
    delivery_slot_day: subscription.deliverySlotDay,
    delivery_slot_start_time: subscription.deliverySlotStartTime,
    delivery_slot_end_time: subscription.deliverySlotEndTime,
    box: {
      box_type: subscription.boxType,
      num_portions: subscription.numPortions,
      num_recipes: subscription.numRecipes,
    },
    slot: {
      id: appropriateSlot.coreSlotId,
      default_day: appropriateSlot.defaultDay,
      cutoff_day: appropriateSlot.cutoffDay,
      cutoff_time: appropriateSlot.cutoffTime,
      delivery_start: appropriateSlot.deliveryStartTime,
      delivery_end: appropriateSlot.deliveryEndTime,
      default: appropriateSlot.isDefault,
      delivery_price: appropriateSlot.deliveryPrice,
    },
    projected: [],
  }
}
