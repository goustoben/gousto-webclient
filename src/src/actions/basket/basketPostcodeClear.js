import { actionTypes } from "actions/actionTypes"

export const basketPostcodeClear = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.BASKET_POSTCODE_CHANGE,
      postcode: '',
    })
    dispatch({
      type: actionTypes.BASKET_ADDRESS_CHANGE,
      address: null,
    })
  }
)
