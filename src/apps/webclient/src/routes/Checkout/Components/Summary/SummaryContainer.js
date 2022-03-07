import React from 'react'
import { connect } from 'react-redux'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { Summary } from './Summary'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    basketRecipes: state.basket.get('recipes'),
    deliveryDate: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const SummaryPure = (props) => {
  const { pricing } = usePricing()

  return <Summary {...props} prices={pricing} />
}
const SummaryContainer = connect(mapStateToProps, null)(SummaryPure)

export { SummaryContainer }
