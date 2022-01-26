import { connect } from 'react-redux'
import { BoxDetails } from './BoxDetails'

function mapStateToProps(state) {
  return {
    browser: state.request.get('browser'),
    numPortions: state.basket.get('numPortions'),
    deliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
  }
}

export const BoxDetailsContainer = connect(mapStateToProps, {})(BoxDetails)
