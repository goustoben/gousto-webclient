import { connect } from 'react-redux'
import actions from 'actions/subscriptionPause'
import Subscription from './Subscription'

const mapStateToProps = (state) => ({
  pendingOrders: state.user.get('orders'),
})

const SubscriptionContainer = connect(mapStateToProps, {
  startSubscriptionPause: actions.subscriptionPauseStart,
})(Subscription)

export default SubscriptionContainer
