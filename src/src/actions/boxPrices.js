import routesConfig from 'config/routes'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import { getBasketPostcode } from 'selectors/basket'

export const boxPricesBoxSizeSelected = (numPersons) => async (dispatch, getState) => {
  const state = getState()
  const postcode = getBasketPostcode(state)

  const destination = postcode ? 'menu' : 'wizard'

  dispatch(trackClickBuildMyBox(`${numPersons} people`, destination))
  dispatch(basketNumPortionChange(numPersons))

  if (destination === 'menu') {
    dispatch(redirect(routesConfig.client.menu))
  } else {
    dispatch(signupNextStep('postcode'))
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected
}
