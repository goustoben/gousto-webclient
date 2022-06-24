import { basketNumPortionChange } from 'actions/basket'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { redirect } from 'actions/redirect'
import { trackClickBuildMyBox } from 'actions/tracking'
import routesConfig from 'config/routes'
import { getBasketPostcode } from 'selectors/basket'
import { getPromoBannerState } from 'utils/home'

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
    if (canApplyPromo) {
      await dispatch(applyPromoCodeAndShowModal())
    }
    dispatch(redirect(`${routesConfig.client.signup}/postcode`))
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected,
}
