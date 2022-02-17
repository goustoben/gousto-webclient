import { connect } from 'react-redux'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { Summary } from './Summary'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    basketRecipes: state.basket.get('recipes'),
    deliveryDate: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const SummaryContainer = connect(mapStateToProps, null)(Summary)

export { SummaryContainer }
