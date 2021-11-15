import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { pricingRequest } from "actions/pricing/pricingRequest"
import { basketPromoCodeAppliedChange } from "actions/basket/basketPromoCodeAppliedChange"
import { trackPromocodeChange } from "actions/checkout/trackPromocodeChange"

export const promoApplyCheckoutCode = () => (
  async (dispatch) => {
    const promoCode = 'DTI-CHECKOUT30'

    try {
      dispatch(basketPromoCodeChange(promoCode))
      dispatch(pricingRequest())
      dispatch(basketPromoCodeAppliedChange(true))
      dispatch(trackPromocodeChange(promoCode, true))
    } catch (e) {
      throw new Error('Promo cannot be applied')
    }
  }
)
