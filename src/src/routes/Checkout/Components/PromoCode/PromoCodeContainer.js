import { connect } from 'react-redux'
import actions from 'actions'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { PromoCode } from './PromoCode'

function mapStateToProps(state) {
  return {
    promoCode: state.basket.get('promoCode'),
    promoCodeApplied: state.basket.get('promoCodeApplied'),
    previewOrderId: state.basket.get('previewOrderId'),
    numPortions: state.basket.get('numPortions'),
    prices: state.pricing.get('prices'),
    recipes: state.basket.get('recipes'),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
  }
}

const PromoCodeContainer = connect(mapStateToProps, {
  basketPromoCodeChange: actions.basketPromoCodeChange,
  basketPromoCodeAppliedChange: actions.basketPromoCodeAppliedChange,
  loadPrices: actions.pricingRequest,
  trackPromocodeChange: actions.trackPromocodeChange,
})(PromoCode)

export {
  PromoCodeContainer
}
