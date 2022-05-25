import {
  signupCheckAccountNewCustomer,
  signupCheckAccountExistingCustomer,
  signupApplyVoucher,
} from 'actions/trackingKeys'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { redirect } from 'actions/redirect'
import loginActions from 'actions/login'
import { menuLoadBoxPrices } from 'actions/menu'
import routes from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'

export const trackCuisineSelected = (cuisineName) => (dispatch) => {
  const type = trackingKeys.cuisineSelected

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
      cuisineName,
    },
  })
}

export const trackCuisineDeselected = (cuisineName) => (dispatch) => {
  const type = trackingKeys.cuisineDeselected

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
      cuisineName,
    },
  })
}

export const trackSignupPersonalisationComplete = (selectedCuisines) => (dispatch) => {
  const type = trackingKeys.signupPersonalisationComplete

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
      selectedCuisines: [...selectedCuisines],
    },
  })
}

export const signupCheckAccountGoToBoxPrices = () => (dispatch) => {
  dispatch(menuLoadBoxPrices())
  dispatch(trackUTMAndPromoCode(signupCheckAccountNewCustomer))
  dispatch(redirect(`${routes.client.signup}/box-size`))
}

export const signupCheckAccountLogin = () => (dispatch) => {
  dispatch(trackUTMAndPromoCode(signupCheckAccountExistingCustomer))

  const { loginVisibilityChange } = loginActions
  dispatch(loginVisibilityChange(true))
}

export const signupApplyVoucherGoToDeliveries = () => (dispatch) => {
  dispatch(trackUTMAndPromoCode(signupApplyVoucher))
  dispatch(redirect(`${routes.client.myDeliveries}`))
}

export const signupSetNumberOfPeople = (numberOfPeople) => ({
  type: actionTypes.SIGNUP_SET_NUMBER_OF_PEOPLE,
  payload: {
    numberOfPeople,
  },
})
