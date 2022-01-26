import { connect } from 'react-redux'
import { FirstDeliveryDay } from './FirstDeliveryDay'

function mapStateToProps(state) {
  return {
    deliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
  }
}

const FirstDeliveryDayContainer = connect(mapStateToProps)(FirstDeliveryDay)

export { FirstDeliveryDayContainer }
