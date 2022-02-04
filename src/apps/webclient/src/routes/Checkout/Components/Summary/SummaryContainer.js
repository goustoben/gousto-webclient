import { connect } from 'react-redux'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getPricingTotalAmount } from 'selectors/pricing'
import { Summary } from './Summary'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    prices: state.pricing.get('prices'),
    basketRecipes: state.basket.get('recipes'),
    deliveryDate: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
    totalToPay: getPricingTotalAmount(state),
  }
}

const SummaryContainer = connect(mapStateToProps, null)(Summary)

export { SummaryContainer }
