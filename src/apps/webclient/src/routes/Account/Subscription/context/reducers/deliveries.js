import { parseTimeRange } from 'utils/deliverySlot'
import { dayNumberMap } from '../../enum/day'

const reduceUpdateFrequency = (state, subscription) => {
  if (!subscription.interval) {
    return state.deliveries.frequency
  }

  return {
    currentValue: subscription.interval.toString(10)
  }
}

export const reduceCurrentDeliverySlot = (state, reducedSlots) => {
  if (!state.subscription || !reducedSlots) {
    return state
  }

  const { deliverySlotId } = state.subscription

  return reducedSlots.find(({ coreSlotId }) => coreSlotId === deliverySlotId)
}

export const reduceDeliverySlot = (slot) => {
  const { deliveryStartTime, deliveryEndTime, defaultDay } = slot

  return {
    ...slot,
    timeRange: parseTimeRange(deliveryStartTime, deliveryEndTime),
    day: dayNumberMap[defaultDay],

  }
}

export const reduceDeliveryFrequency = (subscriptionData) => {
  if (!subscriptionData || !subscriptionData.subscription) {
    return subscriptionData
  }

  const { subscription } = subscriptionData
  const { interval } = subscription

  return {
    currentValue: interval
  }
}

export const reduceDeliverySlots = (state, deliveryDays) =>
  (deliveryDays
    ? deliveryDays
      .reduce((flatDeliverySlots, { slots: deliverySlots }) => [
        ...flatDeliverySlots,
        ...deliverySlots.map(reduceDeliverySlot)
      ], [])
    : state.deliveries.slots)

export const reduceDeliveriesData = (state, data) => {
  const { deliveries, subscription } = data
  const slots = reduceDeliverySlots(state, deliveries)
  const currentDeliverySlot = reduceCurrentDeliverySlot(state, slots)
  const frequency = reduceDeliveryFrequency(subscription)

  return {
    ...state,
    deliveries: {
      ...state.deliveries,
      slots,
      currentDeliverySlot,
      frequency,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}

export const reduceUpdatedDeliveriesData = (state, subscription) => {
  const { slots } = state.deliveries
  const currentDeliverySlot = reduceCurrentDeliverySlot(state, slots)
  const frequency = reduceUpdateFrequency(state, subscription)

  return {
    ...state,
    deliveries: {
      ...state.deliveries,
      currentDeliverySlot,
      frequency,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}
