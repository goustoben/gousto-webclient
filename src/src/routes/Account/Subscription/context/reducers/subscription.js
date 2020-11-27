import logger from 'utils/logger'
import {
  reduceDeliveriesData,
  reduceUpdatedDeliveriesData
} from './deliveries'
import { reduceBoxData } from './box'

export const reduceSubscriptionData = (state, data) => {
  if (!data.subscription) {
    return state
  }

  const { delivery_slot_id: deliverySlotId } = data.subscription

  return {
    ...state,
    subscription: {
      deliverySlotId,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}

export const reduceSubscriptionPageData = (state, data) => {
  try {
    const reducedSubscriptionState = reduceSubscriptionData(state, data.subscription)
    const reducedDeliveriesState = reduceDeliveriesData(reducedSubscriptionState, data)
    const reducedBoxState = reduceBoxData(state, data.subscription)

    return {
      ...state,
      ...reducedSubscriptionState,
      ...reducedDeliveriesState,
      ...reducedBoxState
    }
  } catch (error) {
    logger.error(`Error reducing subscription page data: ${error}`)

    return state
  }
}

export const reduceSubscriptionUpdateData = (state, data) => {
  try {
    const { subscription } = data

    const reducedSubscriptionState = reduceSubscriptionData(state, {
      subscription: { delivery_slot_id: `${subscription.slot.id}` }
    })
    const reducedDeliveriesState = reduceUpdatedDeliveriesData(reducedSubscriptionState, subscription.slot)
    const reducedBoxState = reduceBoxData(reducedDeliveriesState, subscription)

    return {
      ...state,
      ...reducedSubscriptionState,
      ...reducedDeliveriesState,
      ...reducedBoxState
    }
  } catch (error) {
    logger.error(`Error reducing subscription updated page data: ${error}`)

    return state
  }
}
