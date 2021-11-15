import {
  signupCheckAccountNewCustomer,
  signupCheckAccountExistingCustomer,
  signupApplyVoucher,
} from 'actions/trackingKeys'
import routes from 'config/routes'
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { redirect } from "actions/redirect/redirect"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

export const signupCheckAccountGoToBoxPrices = () => (dispatch) => {
  dispatch(trackUTMAndPromoCode(signupCheckAccountNewCustomer))
  dispatch(redirect(`${routes.client.signup}/box-size`))
}

export const signupCheckAccountLogin = () => (dispatch) => {
  dispatch(trackUTMAndPromoCode(signupCheckAccountExistingCustomer))

  dispatch(loginVisibilityChange(true))
}

export const signupApplyVoucherGoToDeliveries = () => (dispatch) => {
  dispatch(trackUTMAndPromoCode(signupApplyVoucher))
  dispatch(redirect(`${routes.client.myDeliveries}`))
}
