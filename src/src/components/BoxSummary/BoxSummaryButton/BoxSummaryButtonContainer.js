import { connect } from 'react-redux'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    pricingPending: state.pricing.get('pending'),
    transactionPending: state.pending.get('CHECKOUT_TRANSACTIONAL_ORDER'),
    orderSave: state.pending.get('ORDER_SAVE'),
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {})(BoxSummaryButton)

export default BoxSummaryButtonContainer
