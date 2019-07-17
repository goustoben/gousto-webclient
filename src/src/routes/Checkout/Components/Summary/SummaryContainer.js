import { connect } from 'react-redux'
import { isShowNoDiscountCTAFeatureEnabled } from 'selectors/features'
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
  }
}

const SummaryContainer = connect(mapStateToProps)(Summary)

export default SummaryContainer
