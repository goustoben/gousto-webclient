import { connect } from 'react-redux'
import { boxSummaryNext } from 'actions/boxSummary'
import { Next } from './Next'

const mapStateToProps = (state) => ({
  pricingPending: state.pricing.get('pending', false),
  showDetails: state.boxSummaryShow.get('show'),
})

const NextContainer = connect(mapStateToProps, {
  boxSummaryNext
})(Next)

export { NextContainer }
