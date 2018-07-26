import { connect } from 'react-redux'
import Subscription from './Subscription'
import actions from 'actions/subscriptionPause'

const mapStateToProps = (state) => ({
	pendingOrders: state.user.get('orders'),
})

const SubscriptionContainer = connect(mapStateToProps, {
	startSubscriptionPause: actions.subscriptionPauseStart,
})(Subscription)

export default SubscriptionContainer
