import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

const onScreenRecovery = {
  onScreenRecovery: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
    case actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED: {
      let newState = state.set('triggered', action.triggered).set('orderType', action.orderType)
      if (action.orderId) {
        newState = newState.set('orderId', action.orderId)
      }
      if (action.deliveryDayId) {
        newState = newState.set('deliveryDayId', action.deliveryDayId)
      }
      if (action.orderDate) {
        newState = newState.set('orderDate', action.orderDate)
      }
      if (action.modalType) {
        newState = newState.set('modalType', action.modalType)
      }
      if (action.forceRefresh) {
        newState = newState.set('forceRefresh', action.forceRefresh)
      }

      return newState
    }
    case actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE: {
      let newState = state
      if (action.modalVisibility) {

        if (action.orderId) {
          newState = newState.set('orderId', action.orderId)
        }
        if (action.deliveryDayId) {
          newState = newState.set('deliveryDayId', action.deliveryDayId)
        }
        if (action.modalType) {
          newState = newState.set('modalType', action.modalType)
        }
        if (action.title) {
          newState = newState.set('title', action.title)
        }
        if (action.offer && action.offer.details) {
          newState = newState.set('offer', action.offer.details)
        }
        if (action.valueProposition) {
          newState = newState.set('valueProposition', action.valueProposition)
        }
        if (action.callToActions) {
          newState = newState.set('callToActions', Immutable.fromJS(action.callToActions))
        }
        if (action.orderType) {
          newState = newState.set('orderType', action.orderType)
        }

        newState = newState.set('modalVisibility', action.modalVisibility)
      } else {
        newState = initialState()
      }

      return newState
    }
    case actionTypes.ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE: {
      return state.set('boxNumber', action.boxNumber)
    }

    default: {
      return state
    }
    }
  }
}

export const initialState = () => Immutable.Map({
  triggered: false,
  modalVisibility: false,
  orderId: '',
  deliveryDayId: '',
  boxNumber: '',
  orderType: '',
  orderDate: '',
  title: '',
  modalType: '',
  offer: null,
  valueProposition: null,
  callToActions: null,
  forceRefresh: false,
})

export default onScreenRecovery
