import { connect } from 'react-redux'
import { isShowNoDiscountCTAFeatureEnabled, isChoosePlanEnabled } from 'selectors/features'
import { getPromoCode } from 'selectors/basket'
import promoActions from 'actions/promos'
import Summary from './Summary'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    prices: state.pricing.get('prices'),
    basketRecipes: state.basket.get('recipes'),
    deliveryDate: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    browser: state.request.get('browser'),
    routing: state.routing,
    showNoDiscountCTA: isShowNoDiscountCTAFeatureEnabled(state),
    showAddPromocode: !isChoosePlanEnabled(state),
    promoCode: getPromoCode(state),
  }
}

const SummaryContainer = connect(mapStateToProps, {
  promoApplyCheckoutCode: promoActions.promoApplyCheckoutCode,
})(Summary)

export default SummaryContainer
