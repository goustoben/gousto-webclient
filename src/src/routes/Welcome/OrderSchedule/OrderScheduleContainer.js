import { connect } from 'react-redux'
import { getUserOrderById } from 'utils/user'
import { getUserFirstName } from 'selectors/user'
import { OrderSchedule } from './OrderSchedule'

function mapStateToProps(state) {
  const orderId = state.basket.get('orderId')
  const nameFirst = getUserFirstName(state)
  const order = getUserOrderById(orderId, state.user.get('orders'))
  const subscription = state.user.get('subscription')

  return {
    deliveryDate: order.get('deliveryDate'),
    whenCutoff: order.get('whenCutoff'),
    interval: subscription ? subscription.get('interval').title : '',
    nameFirst,
  }
}

const OrderScheduleContainer = connect(mapStateToProps)(OrderSchedule)

export { OrderScheduleContainer }
