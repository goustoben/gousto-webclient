import { connect } from 'react-redux'

import { getIsSubscriberPricingEnabled } from 'selectors/features'
import { getBrowserType } from 'selectors/browser'
import { OnScreenRecoveryView } from './OnScreenRecoveryView'
import { trackViewDiscountReminder } from "actions/onScreenRecovery/trackViewDiscountReminder"
import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import { onKeep } from "actions/onScreenRecovery/onKeep"
import { onConfirm } from "actions/onScreenRecovery/onConfirm"
import { getRecoveryContent } from "actions/onScreenRecovery/getRecoveryContent"

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
