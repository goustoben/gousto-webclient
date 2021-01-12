import { connect } from 'react-redux'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { BoxDetails } from './BoxDetails'

function mapStateToProps(state) {
  return {
    recipes: state.basket.get('recipes'),
    browser: state.request.get('browser'),
    numPortions: state.basket.get('numPortions'),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
    deliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
  }
}

export const BoxDetailsContainer = connect(mapStateToProps, {})(BoxDetails)
