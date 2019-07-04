import { connect } from 'react-redux'

import { getSkipRecoveryContent, keepOrder, cancelPendingOrder, cancelProjectedOrder } from 'actions/orderSkipRecovery'

import { OnScreenRecovery } from './OnScreenRecovery'

const mapStateToProps = (state) => ({
  triggered: state.orderSkipRecovery.get('triggered'),
  visible: state.orderSkipRecovery.get('modalVisibility'),
  orderId: state.orderSkipRecovery.get('orderId'),
  orderDate: state.orderSkipRecovery.get('orderDate'),
  deliveryDayId: state.orderSkipRecovery.get('deliveryDayId'),
  orderType: state.orderSkipRecovery.get('orderType'),
  boxNumber: state.subscription.getIn(['subscription', 'currentBoxNumber']),
  title: state.orderSkipRecovery.get('title'),
  offer: state.orderSkipRecovery.get('offer'),
  valueProposition: state.orderSkipRecovery.get('valueProposition'),
  callToActions: state.orderSkipRecovery.get('callToActions'),
})

const mapDispatchToProps = {
  getSkipRecoveryContent,
  keepOrder,
  cancelPendingOrder,
  cancelProjectedOrder,

}

export const OnScreenRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OnScreenRecovery)
