import { connect } from 'react-redux'
import actions from 'actions'
import { Next } from './Next'

const mapStateToProps = (state) => ({
  pricingPending: state.pricing.get('pending', false),
  showDetails: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === 'desktop',
})

const NextContainer = connect(mapStateToProps, {
  boxSummaryNext: actions.boxSummaryNext
})(Next)

export { NextContainer }
