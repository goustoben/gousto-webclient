import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
    modalVisibility: false,
    orderId: '',
    dayId: '',
    boxNumber: '',
    orderType: '',
})

const orderSkipRecovery = {
    orderSkipRecovery: (state, action) => {
        if (!state) {
			return initialState()
		}

		switch (action.type) {
            case actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE: {
                let newState = state
                if (action.modalVisibility) {
                    if (action.orderId) {
                        newState = newState.set('orderId', action.orderId)
                    }
                    if (action.dayId) {
                        newState = newState.set('dayId', action.dayId)
                    }

                    newState = newState.set('orderType', action.orderType)

                } else {
                    newState = initialState()
                }
                newState = newState.set('modalVisibility', action.modalVisibility)

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
