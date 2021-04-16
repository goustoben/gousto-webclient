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
