import { actionTypes } from 'actions/actionTypes'

export function trackingCardTokenizationSuccessfully() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_CARD_TOKENIZATION_SUCCEEDED,
      trackingData: {
        actionType: 'CardTokenization Succeededs'
      }
    })
  }
}
