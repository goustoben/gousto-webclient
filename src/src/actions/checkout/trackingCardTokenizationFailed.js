import { actionTypes } from 'actions/actionTypes'

export function trackingCardTokenizationFailed(err) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_CARD_TOKENIZATION_FAILED,
      trackingData: {
        actionType: 'CardTokenization Failed',
        error_reason: err
      }
    })
  }
}
