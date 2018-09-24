import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
	triggered: false,
	modalVisibility: false,
	orderId: '',
	dayId: '',
	boxNumber: '',
	orderType: '',
	orderDate: '',
	title: '',
	offer: null,
	valueProposition: null,
	callToActions: null,
})

const orderSkipRecovery = {
	orderSkipRecovery: (state, action) => {
		if (!state) {
			return initialState()
		}

		switch (action.type) {
			case actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED: {
				let newState = state.set('triggered', action.triggered).set('orderType', action.orderType)
				if (action.orderId) {
					newState = newState.set('orderId', action.orderId)
				}
				if (action.dayId) {
					newState = newState.set('dayId', action.dayId)
				}
				if (action.orderDate) {
					newState = newState.set('orderDate', action.orderDate)
				}

				return newState
			}
			case actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE: {
				let newState = state
				if (action.modalVisibility) {

					if (action.orderId) {
						newState = newState.set('orderId', action.orderId)
					}
					if (action.dayId) {
						newState = newState.set('dayId', action.dayId)
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
						newState = newState.set('callToActions', action.callToActions)
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

export default orderSkipRecovery
