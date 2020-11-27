import {
  reduceSubscriptionPageData,
  reduceSubscriptionUpdateData
} from './subscription'

import { reduceLoadingState } from './loading'

export const ENTITIES = {
  DELIVERIES: 'deliveries',
  SUBSCRIPRION: 'subscription'
}

export const actionTypes = {
  SUBSCRIPTION_DATA_RECEIVED: 'SUBSCRIPTION_DATA_RECEIVED',
  SUBSCRIPTION_UPDATE_DATA_RECEIVED: 'SUBSCRIPTION_UPDATE_DATA_RECEIVED',
  USER_SUBSCRIPTION_DATA_LOADING: 'USER_SUBSCRIPTION_DATA_LOADING',
  DELIVERIES_DATA_LOADING: 'DELIVERIES_DATA_LOADING',
}

export const SubscriptionReducer = (state, action) => {
  const { type, data } = action

  switch (type) {
  case actionTypes.SUBSCRIPTION_DATA_RECEIVED:
    return reduceSubscriptionPageData(state, data)

  case actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED:
    return reduceSubscriptionUpdateData(state, data)

  case actionTypes.USER_SUBSCRIPTION_DATA_LOADING:
  case actionTypes.DELIVERIES_DATA_LOADING:
    return reduceLoadingState(
      state,
      type === actionTypes.USER_SUBSCRIPTION_DATA_LOADING
        ? ENTITIES.SUBSCRIPRION
        : ENTITIES.DELIVERIES
    )

  default:
    return state
  }
}
