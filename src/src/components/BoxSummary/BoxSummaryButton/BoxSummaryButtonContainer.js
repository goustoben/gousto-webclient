import { connect } from 'react-redux'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    pricingPending: state.pricing.get('pending'),
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {})(BoxSummaryButton)

export default BoxSummaryButtonContainer
