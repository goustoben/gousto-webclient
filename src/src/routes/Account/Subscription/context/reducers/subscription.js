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

  const { delivery_slot_id: deliverySlotId, state: subscriptionStatus } = data.subscription

  return {
    ...state,
    subscription: {
      deliverySlotId,
      status: subscriptionStatus,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}

export const reduceSubscriptionHideResubscriptionModal = (state) => ({
  ...state,
  subscription: {
    ...state.subscription,
    showResubscriptionModal: false,
  }
})

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
    const defaultSubscription = {
      slot: {},
      state: { description: '' }
    }
    const subscriptionWithDefaults = {
      ...defaultSubscription,
      ...subscription
    }
    const { slot: { id }, state: { description } } = subscriptionWithDefaults

    const reducedSubscriptionState = reduceSubscriptionData(state, {
      subscription: {
        delivery_slot_id: `${id}`,
        state: description.toLowerCase()
      }
    })
    const reducedDeliveriesState = reduceUpdatedDeliveriesData(reducedSubscriptionState, subscription)
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

export const reduceSubscriptionStatusUpdate = (state, data) => {
  try {
    const subscriptionStatus = state.isNewSubscriptionApiEnabled
      ? data.subscription.status
      : data.state
    const reducedSubscriptionState = {
      ...state.subscription,
      status: subscriptionStatus,
      showResubscriptionModal: state.isSubscriberPricingEnabled,
    }

    return {
      ...state,
      subscription: reducedSubscriptionState
    }
  } catch (error) {
    logger.error(`Error reducing subscription activate data: ${error}`)

    return state
  }
}
