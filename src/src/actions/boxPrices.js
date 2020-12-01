import routesConfig from 'config/routes'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import { getBasketPostcode } from 'selectors/basket'
import { getIsDiscountBoxPricesEnabled } from 'selectors/features'
import { applyPromoCodeAndRedirect } from 'actions/home'
import { getPromoBannerState } from 'utils/home'

export const boxPricesBoxSizeSelected = (numPersons) => async (dispatch, getState) => {
  const state = getState()
  const postcode = getBasketPostcode(state)
  const { hide, canApplyPromo } = getPromoBannerState(state)
  const { menu, signup } = routesConfig.client
  const postcodeStep = 'postcode'
  const destination = postcode ? 'menu' : 'wizard'

  dispatch(trackClickBuildMyBox(`${numPersons} people`, destination))
  dispatch(basketNumPortionChange(numPersons))

  if (destination === 'menu') {
    dispatch(redirect(menu))
  } else {
    const isDiscountBoxPricesEnabled = getIsDiscountBoxPricesEnabled(state)
    let success = false

    if (isDiscountBoxPricesEnabled && !hide && canApplyPromo) {
      success = await dispatch(applyPromoCodeAndRedirect(dispatch, state, `${signup}/${postcodeStep}`))
    }

    if (!success) {
      dispatch(signupNextStep(postcodeStep))
    }
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected
}
