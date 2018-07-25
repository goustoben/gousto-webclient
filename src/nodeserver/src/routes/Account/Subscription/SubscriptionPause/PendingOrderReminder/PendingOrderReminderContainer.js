import { connect } from 'react-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */
import PendingOrderReminder from './PendingOrderReminder'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'

function mapStateToProps(state) {
	return {
		orderCancelPending: state.pending.get(actionTypes.SUBSCRIPTION_CANCEL_ORDERS),
		pendingOrders: state.user.get('orders').filter(o => o.get('phase') === 'open'),
		committedOrders: state.user.get('orders').filter(o => ['cutoff', 'delivery', 'packing', 'picking'].indexOf(o.get('phase')) >= 0),
	}
}

const PendingOrderReminderContainer = connect(mapStateToProps, {
	close: () => actions.temp('pendingOrderIds', Immutable.List([])),
	cancelPendingOrders: () => actions.cancelPendingOrders(),
})(PendingOrderReminder)

export default PendingOrderReminderContainer
