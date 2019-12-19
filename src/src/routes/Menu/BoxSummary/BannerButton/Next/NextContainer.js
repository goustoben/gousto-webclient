import { connect } from 'react-redux'
import actions from 'actions'
import { Next } from './Next'

const mapStateToProps = (state) => ({
  pricingPending: state.pricing.get('pending', false),
  showDetails: state.boxSummaryShow.get('show'),
})

const NextContainer = connect(mapStateToProps, {
  boxSummaryNext: actions.boxSummaryNext
})(Next)

export { NextContainer }
