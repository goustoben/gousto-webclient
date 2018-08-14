import { connect } from 'react-redux'

import { keepOrder, cancelPendingOrder } from 'actions/orderSkipRecovery'

import OrderSkipRecovery from './OrderSkipRecovery'

const mapStateToProps = (state) => ({
    visible: state.orderSkipRecovery.get('modalVisibility'),
    orderId: state.orderSkipRecovery.get('orderId'),
})

const mapDispatchToProps = {
    keepOrder,
    cancelOrder: cancelPendingOrder,
}

const OrderSkipRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OrderSkipRecovery)

export default OrderSkipRecoveryContainer
