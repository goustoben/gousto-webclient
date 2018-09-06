import { connect } from 'react-redux'

import { getSkipRecoveryContent, keepOrder, cancelPendingOrder, cancelProjectedOrder } from 'actions/orderSkipRecovery'

import { OrderSkipRecovery } from './OrderSkipRecovery'

const mapStateToProps = (state) => ({
    triggered: state.orderSkipRecovery.get('triggered'),
    visible: state.orderSkipRecovery.get('modalVisibility'),
    orderId: state.orderSkipRecovery.get('orderId'),
    dayId: state.orderSkipRecovery.get('dayId'),
    orderType: state.orderSkipRecovery.get('orderType'),
    boxNumber: state.subscription.get('subscription').get('currentBoxNumber'),
    skipRecovery: state.features.get('skipRecovery').get('value'),
})

const mapDispatchToProps = {
    getSkipRecoveryContent,
    keepOrder,
    cancelPendingOrder,
    cancelProjectedOrder,

}

export const OrderSkipRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OrderSkipRecovery)
