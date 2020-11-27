import { parseTimeRange } from 'utils/deliverySlot'
import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'
import { dayNumberMap } from '../../enum/day'

export const reduceCurrentDeliverySlot = (state, reducedSlots) => {
  if (!state.subscription || !reducedSlots) {
    return state
  }

  const { deliverySlotId } = state.subscription

  return reducedSlots.find(({ coreSlotId }) => coreSlotId === deliverySlotId)
}

export const reduceDeliverySlot = (slot) => {
  const camelCaseSlot = parseObjectKeysToCamelCase(slot)
  const { deliveryStartTime, deliveryEndTime, defaultDay } = camelCaseSlot

  return {
    ...camelCaseSlot,
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

export const reduceUpdatedDeliveriesData = (state) => {
  const { slots } = state.deliveries
  const currentDeliverySlot = reduceCurrentDeliverySlot(state, slots)

  return {
    ...state,
    deliveries: {
      ...state.deliveries,
      currentDeliverySlot,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}
