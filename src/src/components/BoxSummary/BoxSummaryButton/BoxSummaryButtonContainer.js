import { connect } from 'react-redux'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    pricingPending: state.pricing.get('pending', false),
    orderSavePending: state.pending.get('ORDER_SAVE', false),
    basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false)
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {})(BoxSummaryButton)

export default BoxSummaryButtonContainer
