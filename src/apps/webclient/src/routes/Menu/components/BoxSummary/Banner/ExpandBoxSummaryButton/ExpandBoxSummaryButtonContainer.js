import React from 'react'
import { connect } from 'react-redux'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getNumPortions, getBasketDate, getBasketSlotId } from 'selectors/basket'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'

const mapStateToProps = (state) => ({
  showDetails: state.boxSummaryShow.get('show'),
})

const ExpandBoxSummaryButtonContainer = connect(mapStateToProps)(ExpandBoxSummaryButton)

export { ExpandBoxSummaryButtonContainer }
