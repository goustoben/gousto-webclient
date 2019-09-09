import { connect } from 'react-redux'
import { getShortlist } from 'selectors/features'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    showRecipeCountButton: state.request.get('browser') === 'mobile' && getShortlist(state) && !state.boxSummaryShow.get('show'),
    pricingPending: state.pricing.get('pending', false),
    orderSavePending: state.pending.get('ORDER_SAVE', false),
    basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false)
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {})(BoxSummaryButton)

export default BoxSummaryButtonContainer
