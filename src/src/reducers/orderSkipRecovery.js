import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
    modalVisibility: false,
    orderId: '',
})

const orderSkipRecovery = {
    orderSkipRecovery: (state, action) => {
        if (!state) {
			return initialState()
		}

		switch (action.type) {
            case actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE: {
                let newState = state
                if (action.orderId) {
                    newState = newState.set('orderId', action.orderId)
                }
                newState = newState.set('modalVisibility', action.modalVisibility)

                return newState
            }

            default: {
                return state
            }
        }
    }
}

export default orderSkipRecovery
