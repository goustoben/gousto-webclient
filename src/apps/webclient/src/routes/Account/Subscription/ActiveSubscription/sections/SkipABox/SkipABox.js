import React from 'react'
import { browserHistory } from 'react-router'
import { CTA } from 'goustouicomponents'
import { trackSubscriptionSettingsChange } from '../../../tracking'

export const SkipABox = () => {
  const settingName = 'skip_a_box'
  const handleClick = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'cta_clicked' })()
    browserHistory.push('/my-deliveries')
  }

  return (
    <CTA
      isFullWidth
      onClick={handleClick}
      variant="secondary"
      testingSelector="skip-a-box-cta"
    >
      Skip box or boxes
    </CTA>
  )
}
