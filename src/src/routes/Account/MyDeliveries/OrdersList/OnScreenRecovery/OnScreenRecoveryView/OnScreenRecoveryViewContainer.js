import { connect } from 'react-redux'

import {
  onKeep,
  onConfirm,
  getRecoveryContent,
  modalVisibilityChange,
  trackViewDiscountReminder
} from 'actions/onScreenRecovery'
import { getIsSubscriberPricingEnabled } from 'selectors/features'
import { getBrowserType } from 'selectors/browser'
import { OnScreenRecoveryView } from './OnScreenRecoveryView'

const mapStateToProps = (state) => ({
  title: state.onScreenRecovery.get('title'),
  offer: state.onScreenRecovery.get('offer'),
  valueProposition: state.onScreenRecovery.get('valueProposition'),
  keepCopy: state.onScreenRecovery.getIn(['callToActions', 'keep']),
  confirmCopy: state.onScreenRecovery.getIn(['callToActions', 'confirm']),
  type: state.onScreenRecovery.get('modalType'),
  isSubscriberPricingEnabled: getIsSubscriberPricingEnabled(state),
  isMobileViewport: getBrowserType(state) === 'mobile',
})

const mapDispatchToProps = {
  onKeep,
  onConfirm,
  modalVisibilityChange,
  getRecoveryContent,
  trackViewDiscountReminder
}

export const OnScreenRecoveryViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(OnScreenRecoveryView)
