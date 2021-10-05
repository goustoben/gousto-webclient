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
