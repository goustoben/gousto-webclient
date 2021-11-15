import { actionTypes } from 'actions/actionTypes'

export const checkoutStepIndexReached = (stepIndex) => dispatch => {
  dispatch({
    type: actionTypes.CHECKOUT_STEP_INDEX_REACHED,
    stepIndex
  })
}
