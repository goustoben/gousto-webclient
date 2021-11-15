import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { promoCurrentSet } from "./promoCurrentSet"
import { clickCloseGodFailureHomepage } from "actions/trackingKeys"
import { promoToggleModalVisibility } from "./promoToggleModalVisibility"
import { signupSetGoustoOnDemandEnabled } from "actions/signup/signupSetGoustoOnDemandEnabled"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

export const promoResetGoustoOnDemandFlow = () => (
  dispatch => {
    dispatch(basketPromoCodeChange(''))
    dispatch(promoCurrentSet(''))
    dispatch(trackUTMAndPromoCode(clickCloseGodFailureHomepage))
    dispatch(signupSetGoustoOnDemandEnabled(false))
    dispatch(promoToggleModalVisibility(false))
  }
)
