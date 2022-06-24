import { basketNumPortionChange } from 'actions/basket'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import { hotjarSkipWizard } from 'actions/trackingKeys'
import routesConfig from 'config/routes'
import { getIsSkipWizardEnabled } from 'routes/Signup/signupSelectors'
import { getIsAuthenticated } from 'selectors/auth'
import { getBasketPostcode } from 'selectors/basket'
import { getPromoBannerState } from 'utils/home'
import { invokeHotjarEvent } from 'utils/hotjarUtils'
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

    const isSkipWizardEnabled = getIsSkipWizardEnabled(state)
    const isAuthenticated = getIsAuthenticated(state)
    const shouldSkipWizardByFeature = !isAuthenticated && isSkipWizardEnabled

    if (shouldSkipWizardByFeature) {
      invokeHotjarEvent(hotjarSkipWizard)
      dispatch(redirect(routesConfig.client.menu))
    } else {
      dispatch(signupNextStep(destinationStep.get('name')))
    }
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected,
}
