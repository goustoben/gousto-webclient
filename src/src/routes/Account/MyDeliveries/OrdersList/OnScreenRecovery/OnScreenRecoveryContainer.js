import { connect } from 'react-redux'

import { getRecoveryContent, onKeep, onConfirm } from 'actions/onScreenRecovery'

import { OnScreenRecovery } from './OnScreenRecovery'

const mapStateToProps = (state) => ({
  triggered: state.onScreenRecovery.get('triggered'),
  visible: state.onScreenRecovery.get('modalVisibility'),
  orderId: state.onScreenRecovery.get('orderId'),
  orderDate: state.onScreenRecovery.get('orderDate'),
  deliveryDayId: state.onScreenRecovery.get('deliveryDayId'),
  orderType: state.onScreenRecovery.get('orderType'),
  boxNumber: state.subscription.getIn(['subscription', 'currentBoxNumber']),
  title: state.onScreenRecovery.get('title'),
  offer: state.onScreenRecovery.get('offer'),
  valueProposition: state.onScreenRecovery.get('valueProposition'),
  keepCopy: state.onScreenRecovery.getIn(['callToActions', 'keep']),
  confirmCopy: state.onScreenRecovery.getIn(['callToActions', 'confirm']),
})

const mapDispatchToProps = {
  getRecoveryContent,
  onKeep,
  onConfirm

}

export const OnScreenRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OnScreenRecovery)
