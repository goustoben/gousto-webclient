import { connect } from 'react-redux'
import { Summary } from './Summary'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    prices: state.pricing.get('prices'),
    basketRecipes: state.basket.get('recipes'),
    deliveryDate: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
  }
}

const SummaryContainer = connect(mapStateToProps, null)(Summary)

export { SummaryContainer }
