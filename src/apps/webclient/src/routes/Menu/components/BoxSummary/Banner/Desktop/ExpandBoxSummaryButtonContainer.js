import React from 'react'
import { connect } from 'react-redux'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getNumPortions, getBasketDate, getBasketSlotId } from 'selectors/basket'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'

const mapStateToProps = (state) => ({
  showDetails: state.boxSummaryShow.get('show'),
  numPortions: getNumPortions(state),
  date: getBasketDate(state),
  slotId: getBasketSlotId(state)
})

const ExpandBoxSummaryButtonPure = (props) => {
  const { pending } = usePricing()

  return <ExpandBoxSummaryButton {...props} pricingPending={pending} />
}

const ExpandBoxSummaryButtonContainer = connect(mapStateToProps)(ExpandBoxSummaryButtonPure)

export { ExpandBoxSummaryButtonContainer }
