import {
  reduceSubscriptionPageData,
  reduceSubscriptionUpdateData,
  reduceSubscriptionStatusUpdate,
  reduceSubscriptionHideResubscriptionModal
} from './subscription'

import { reduceCurrentUserData } from './currentUser'
import { reduceBoxPricesData, reduceSelectedBoxSize, reduceSelectedMealsPerBox, reduceSwitchToFourMealsPerBox } from './box'
import { reduceLoadingState } from './loading'
import { reduceOrdersData } from './orders'

export const ENTITIES = {
  DELIVERIES: 'deliveries',
  SUBSCRIPTION: 'subscription',
  CURRENT_USER: 'currentUser',
}

export const actionTypes = {
  SUBSCRIPTION_DATA_RECEIVED: 'SUBSCRIPTION_DATA_RECEIVED',
  SUBSCRIPTION_UPDATE_DATA_RECEIVED: 'SUBSCRIPTION_UPDATE_DATA_RECEIVED',
  SUBSCRIPTION_STATUS_UPDATE_RECEIVED: 'SUBSCRIPTION_STATUS_UPDATE_RECEIVED',
  USER_SUBSCRIPTION_DATA_LOADING: 'USER_SUBSCRIPTION_DATA_LOADING',
  DELIVERIES_DATA_LOADING: 'DELIVERIES_DATA_LOADING',
  CURRENT_USER_DATA_RECEIVED: 'CURRENT_USER_DATA_RECEIVED',
  BOX_PRICES_DATA_RECEIVED: 'BOX_PRICES_DATA_RECEIVED',
  ORDERS_DATA_RECEIVED: 'ORDERS_DATA_RECEIVED',
  SUBSCRIPTION_HIDE_RESUBSCRIPTION_MODAL: 'SUBSCRIPTION_HIDE_RESUBSCRIPTION_MODAL',
  UPDATE_SELECTED_BOX_SIZE: 'UPDATE_SELECTED_BOX_SIZE',
  UPDATE_SELECTED_MEALS_PER_BOX: 'UPDATE_SELECTED_MEALS_PER_BOX',
  SWITCH_TO_FOUR_MEALS_PER_BOX: 'SWITCH_TO_FOUR_MEALS_PER_BOX',
}

export const SubscriptionReducer = (state, action) => {
  const { type, data } = action

  switch (type) {
  case actionTypes.SUBSCRIPTION_DATA_RECEIVED:
    return reduceSubscriptionPageData(state, data)

  case actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED:
    return reduceSubscriptionUpdateData(state, data)

  case actionTypes.SUBSCRIPTION_STATUS_UPDATE_RECEIVED:
    return reduceSubscriptionStatusUpdate(state, data)

  case actionTypes.USER_SUBSCRIPTION_DATA_LOADING:
  case actionTypes.DELIVERIES_DATA_LOADING:
    return reduceLoadingState(
      state,
      type === actionTypes.USER_SUBSCRIPTION_DATA_LOADING
        ? ENTITIES.SUBSCRIPTION
        : ENTITIES.DELIVERIES
    )

  case actionTypes.CURRENT_USER_DATA_RECEIVED:
    return reduceCurrentUserData(state, data)

  case actionTypes.BOX_PRICES_DATA_RECEIVED:
    return reduceBoxPricesData(state, data)

  case actionTypes.ORDERS_DATA_RECEIVED:
    return reduceOrdersData(state, data)

  case actionTypes.SUBSCRIPTION_HIDE_RESUBSCRIPTION_MODAL:
    return reduceSubscriptionHideResubscriptionModal(state)

  case actionTypes.UPDATE_SELECTED_BOX_SIZE:
    return reduceSelectedBoxSize(state, data)

  case actionTypes.UPDATE_SELECTED_MEALS_PER_BOX:
    return reduceSelectedMealsPerBox(state, data)

  case actionTypes.SWITCH_TO_FOUR_MEALS_PER_BOX:
    return reduceSwitchToFourMealsPerBox(state)

  default:
    return state
  }
}
