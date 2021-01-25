import routesConfig from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { applyPromoCodeAndRedirect } from 'actions/home'
import { trackClickBuildMyBox } from 'actions/tracking'
import { fetchBoxPrices } from 'apis/boxPrices'
import config from 'config/boxprices'
import { getBasketPostcode } from 'selectors/basket'
import { getIsDiscountBoxPricesEnabled } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'

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

export const updatePricePerServing = () => async (dispatch, getState) => {
  let price = config.pricePerServing

  try {
    const state = getState()
    const promoCode = state.basket.get('promoCode')
    const orderId = state.basket.get('orderId')
    const tariffId = state.basket.get('tariffId')
    const isAuthenticated = state.auth.get('isAuthenticated')
    const accessToken = state.auth.get('accessToken')
    const reqData = {}

    if (orderId) {
      reqData.order_id = orderId
    } else if (promoCode) {
      reqData.promocode = promoCode
    }

    if (!isAuthenticated && tariffId) {
      reqData.tariff_id = tariffId
    }

    const { data } = await fetchBoxPrices(accessToken, reqData)

    price = data[4][4].gourmet.pricePerPortion
  } catch (err) {
    logger.error(err)
  } finally {
    dispatch({
      type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
      price,
    })
  }
}

export const boxPricesActions = {
  boxPricesBoxSizeSelected,
  updatePricePerServing,
}
