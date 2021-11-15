import { connect } from 'react-redux'
import { PromoCode } from './PromoCode'
import { sendRequestToUpdateOrderSummaryPrices } from "actions/checkout/sendRequestToUpdateOrderSummaryPrices"
import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { basketPromoCodeAppliedChange } from "actions/basket/basketPromoCodeAppliedChange"
import { trackPromocodeChange } from "actions/checkout/trackPromocodeChange"

function mapStateToProps(state) {
  const prices = state.pricing.get('prices')
  const promoCodeValid = prices.get('promoCodeValid', false)

  return {
    promoCode: state.basket.get('promoCode'),
    promoCodeApplied: state.basket.get('promoCodeApplied'),
    previewOrderId: state.basket.get('previewOrderId'),
    numPortions: state.basket.get('numPortions'),
    recipes: state.basket.get('recipes'),
    promoCodeValid,
  }
}

const mapDispatchToProps = {
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  trackPromocodeChange,
  sendRequestToUpdateOrderSummaryPrices,
}

const PromoCodeContainer = connect(mapStateToProps, mapDispatchToProps)(PromoCode)

export { PromoCodeContainer }
