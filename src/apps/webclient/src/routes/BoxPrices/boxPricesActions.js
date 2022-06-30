import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import routesConfig from 'config/routes'
import { applyPromoCodeAndShowModal } from 'routes/Home/homeActions'
import { getBasketPostcode } from 'selectors/basket'
import { getPromoBannerState } from 'utils/home'
import { findStepBySlug } from 'utils/signup'

export const boxPricesBoxSizeSelected = (numPersons) => async (dispatch, getState) => {
  const state = getState()
  const postcode = getBasketPostcode(state)
  // Note: the actual promo code doesn't matter here, so we don't pass
  // isTwoMonthPromoCodeEnabled
  const { canApplyPromo } = getPromoBannerState(state)
  const destination = postcode ? 'menu' : 'wizard'

  dispatch(trackClickBuildMyBox(`${numPersons} people`, destination))
  dispatch(basketNumPortionChange(numPersons))

  if (destination === 'menu') {
    dispatch(redirect(routesConfig.client.menu))
  } else {
    const destinationStep = findStepBySlug('postcode')

    if (canApplyPromo) {
      await dispatch(applyPromoCodeAndShowModal())
    }

    dispatch(signupNextStep(destinationStep.get('name')))
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected,
}
