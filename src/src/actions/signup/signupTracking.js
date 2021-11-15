import { actionTypes } from "actions/actionTypes"

export function signupTracking() {
  return (dispatch, getState) => {
    const {basket} = getState()
    const postcode = basket.get('postcode')
    const numAdults = basket.get('numAdults')
    const numPortions = basket.get('numPortions')
    const date = basket.get('date')
    const slotId = basket.get('slotId')

    dispatch({
      type: actionTypes.SIGNUP_TRACKING,
      trackingData: {
        actionType: actionTypes.SIGNUP_TRACKING,
        postcode,
        numAdults,
        numPortions,
        date,
        slotId,
      },
    })
  }
}
