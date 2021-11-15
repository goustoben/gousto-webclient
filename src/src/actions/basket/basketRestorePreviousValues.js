import { actionTypes } from "actions/actionTypes"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const basketRestorePreviousValues = () => (
  (dispatch, getState) => {
    const {basket} = getState()
    const prevSlotId = basket.get('prevSlotId')
    const slotId = basket.get('slotId')
    const prevPostcode = basket.get('prevPostcode')
    const postcode = basket.get('postcode')
    const prevAddress = basket.get('prevAddress')
    const address = basket.get('address')

    if (slotId === '' && prevSlotId !== '') {
      dispatch({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: prevSlotId,
      })
    }

    if (postcode === '' && prevPostcode !== '') {
      dispatch({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: prevPostcode,
      })
    }

    if (address === null && prevAddress !== null) {
      dispatch({
        type: actionTypes.BASKET_ADDRESS_CHANGE,
        address: prevAddress,
      })
    }

    dispatch(pricingRequest())
  }
)
