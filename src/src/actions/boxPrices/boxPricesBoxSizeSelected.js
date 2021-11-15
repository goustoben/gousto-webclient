import { getBasketPostcode } from "selectors/basket"
import { getPromoBannerState } from "utils/home"
import { getIsPaymentBeforeChoosingEnabled } from "selectors/features"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import routesConfig from "config/routes"
import { findStepBySlug } from "utils/signup"
import { applyPromoCodeAndShowModal } from "actions/home/applyPromoCodeAndShowModal"
import { redirect } from "actions/redirect/redirect"
import { signupNextStep } from "actions/signup/signupNextStep"
import { trackClickBuildMyBox } from "actions/tracking/trackClickBuildMyBox"

export const boxPricesBoxSizeSelected = (numPersons) => async (dispatch, getState) => {
    const state = getState()
    const postcode = getBasketPostcode(state)
    const {canApplyPromo} = getPromoBannerState(state)
    const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)
    const destination = postcode ? 'menu' : 'wizard'

    dispatch(trackClickBuildMyBox(`${numPersons} people`, destination))
    dispatch(basketNumPortionChange(numPersons))

    if (destination === 'menu') {
        dispatch(redirect(routesConfig.client.menu))
    } else {
        const destinationStep = isPaymentBeforeChoosingEnabled ? findStepBySlug('recipes-per-box') : findStepBySlug('postcode')

        if (canApplyPromo) {
            await dispatch(applyPromoCodeAndShowModal())
        }

        dispatch(signupNextStep(destinationStep.get('name')))
    }
}
