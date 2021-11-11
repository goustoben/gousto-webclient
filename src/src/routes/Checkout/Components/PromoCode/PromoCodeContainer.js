import { connect } from 'react-redux'
import { basketPromoCodeChange, basketPromoCodeAppliedChange } from 'actions/basket'
import { sendRequestToUpdateOrderSummaryPrices, trackPromocodeChange } from 'actions/checkout'
import { PromoCode } from './PromoCode'

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
