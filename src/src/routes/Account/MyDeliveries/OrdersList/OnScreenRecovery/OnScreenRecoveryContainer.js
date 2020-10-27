import { connect } from 'react-redux'

import { getRecoveryContent, onKeep, onConfirm, modalVisibilityChange } from 'actions/onScreenRecovery'

import { OnScreenRecovery } from './OnScreenRecovery'

const mapStateToProps = (state) => ({
  triggered: state.onScreenRecovery.get('triggered'),
  visible: state.onScreenRecovery.get('modalVisibility'),
  title: state.onScreenRecovery.get('title'),
  offer: state.onScreenRecovery.get('offer'),
  keepCopy: state.onScreenRecovery.getIn(['callToActions', 'keep']),
  confirmCopy: state.onScreenRecovery.getIn(['callToActions', 'confirm']),
})

const mapDispatchToProps = {
  getRecoveryContent,
  onKeep,
  onConfirm,
  modalVisibilityChange,
}

export const OnScreenRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OnScreenRecovery)
