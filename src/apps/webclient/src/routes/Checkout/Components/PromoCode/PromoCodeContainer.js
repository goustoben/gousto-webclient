import { connect } from 'react-redux'
import actions from 'actions'
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
  basketPromoCodeChange: actions.basketPromoCodeChange,
  basketPromoCodeAppliedChange: actions.basketPromoCodeAppliedChange,
  trackPromocodeChange: actions.trackPromocodeChange,
}

const PromoCodeContainer = connect(mapStateToProps, mapDispatchToProps)(PromoCode)

export { PromoCodeContainer }
