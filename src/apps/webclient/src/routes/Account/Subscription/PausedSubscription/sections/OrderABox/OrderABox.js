import React from 'react'
import { browserHistory } from 'react-router'
import { CTA } from 'goustouicomponents'
import { trackSubscriptionSettingsChange } from '../../../tracking'

export const OrderABox = () => {
  const settingName = 'order_a_box'
  const handleClick = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'cta_clicked' })()
    browserHistory.push('/menu')
  }

  return (
    <CTA
      isFullWidth
      onClick={handleClick}
      variant="secondary"
      testingSelector="order-a-box-cta"
    >
      Order a one-off box
    </CTA>
  )
}
