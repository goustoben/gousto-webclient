import { connect } from 'react-redux'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'

const mapStateToProps = (state) => ({
  showDetails: state.boxSummaryShow.get('show'),
  pricingPending: state.pricing.get('pending'),
  numPortions: state.basket.get('numPortions'),
  date: state.basket.get('date'),
  slotId: state.basket.get('slotId')
})

const ExpandBoxSummaryButtonContainer = connect(mapStateToProps)(ExpandBoxSummaryButton)

export { ExpandBoxSummaryButtonContainer }
