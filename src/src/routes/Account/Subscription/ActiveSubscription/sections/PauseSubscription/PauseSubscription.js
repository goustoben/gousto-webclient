import React from 'react'
import { CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { trackSubscriptionSettingsChange } from '../../../tracking'

export const PauseSubscription = ({ startOnScreenRecoverySubscriptionFlow }) => {
  const settingName = 'pause_subscription'
  const handleClick = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'cta_clicked' })()
    startOnScreenRecoverySubscriptionFlow()
  }

  return (
    <CTA
      isFullWidth
      onClick={handleClick}
      variant="secondary"
      testingSelector="pause-subscription-cta"
    >
      Pause subscription
    </CTA>
  )
}

PauseSubscription.propTypes = {
  startOnScreenRecoverySubscriptionFlow: PropTypes.func.isRequired
}
