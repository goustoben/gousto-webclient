import { getLandingDay } from "utils/deliveries"
import { actionTypes } from "actions/actionTypes"
import { push } from "react-router-redux"
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { boxSummaryDeliverySlotChosen } from "actions/boxSummary/boxSummaryDeliverySlotChosen"
import { getBasketRecipes } from "selectors/basket"
import { basketAddressChange } from "actions/basket/basketAddressChange"
import { basketPostcodeChange } from "actions/basket/basketPostcodeChange"

export const boxSummaryNext = () => (
    (dispatch, getState) => {
        const state = getState()
        const landing = getLandingDay(state, {useCurrentSlot: true})

        const tempDate = state.temp.get('date', landing.date)
        const tempSlotId = state.temp.get('slotId', landing.slotId)
        const tempOrderId = state.temp.get('orderId')

        const basketPostcode = state.basket.get('postcode')

        if (basketPostcode && !state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE)) {
            if (tempOrderId) {
                dispatch(push(`/menu/${tempOrderId}`))
                dispatch(boxSummaryVisibilityChange(false))
            } else {
                dispatch(boxSummaryDeliverySlotChosen({date: tempDate, slotId: tempSlotId}))
                if (getBasketRecipes(state).size === 0) {
                    dispatch(boxSummaryVisibilityChange(false))
                }
            }
        } else {
            const tempPostcode = state.temp.get('postcode', '')
            let shippingDefault
            if (state.user.get('shippingAddresses')) {
                shippingDefault = state.user.get('shippingAddresses').filter(address => address.get('shippingDefault')).first()
            }

            const chosenAddress = state.basket.get('chosenAddress') || shippingDefault

            if (chosenAddress) {
                dispatch(basketAddressChange(chosenAddress))
                dispatch(basketPostcodeChange(chosenAddress.get('postcode')))
            } else if (tempPostcode && tempPostcode.trim() !== '') {
                const postcode = state.temp.get('postcode')
                dispatch(basketPostcodeChange(postcode))
            }
        }
    }
)
