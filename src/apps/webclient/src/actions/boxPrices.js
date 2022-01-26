import routesConfig from 'config/routes'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { trackClickBuildMyBox } from 'actions/tracking'
import { getBasketPostcode } from 'selectors/basket'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import { findStepBySlug } from 'utils/signup'

export const boxPricesBoxSizeSelected = (numPersons) => async (dispatch, getState) => {
  const state = getState()
  const postcode = getBasketPostcode(state)
  const { canApplyPromo } = getPromoBannerState(state)
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

export const boxPricesActions = {
  boxPricesBoxSizeSelected,
}
