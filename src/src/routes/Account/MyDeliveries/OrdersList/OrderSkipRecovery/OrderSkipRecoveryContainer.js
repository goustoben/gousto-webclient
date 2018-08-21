import { connect } from 'react-redux'

import { keepOrder, cancelPendingOrder, cancelProjectedOrder } from 'actions/orderSkipRecovery'

import { OrderSkipRecovery } from './OrderSkipRecovery'

const mapStateToProps = (state) => ({
    visible: state.orderSkipRecovery.get('modalVisibility'),
    orderId: state.orderSkipRecovery.get('orderId'),
    dayId: state.orderSkipRecovery.get('dayId'),
    orderType: state.orderSkipRecovery.get('orderType'),
    boxNumber: state.orderSkipRecovery.get('boxNumber'),
})

const mapDispatchToProps = {
    keepOrder,
    cancelPendingOrder,
    cancelProjectedOrder,
}

export const OrderSkipRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OrderSkipRecovery)
