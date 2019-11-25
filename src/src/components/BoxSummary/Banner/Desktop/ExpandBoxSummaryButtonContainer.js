import { connect } from 'react-redux'
import { getNumPortions, getBasketDate, getBasketSlotId } from 'selectors/basket'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'

const mapStateToProps = (state) => ({
  showDetails: state.boxSummaryShow.get('show'),
  pricingPending: state.pricing.get('pending'),
  numPortions: getNumPortions(state),
  date: getBasketDate(state),
  slotId: getBasketSlotId(state)
})

const ExpandBoxSummaryButtonContainer = connect(mapStateToProps)(ExpandBoxSummaryButton)

export { ExpandBoxSummaryButtonContainer }
