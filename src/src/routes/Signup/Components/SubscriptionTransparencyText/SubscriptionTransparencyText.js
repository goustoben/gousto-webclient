import React from 'react'
import Svg from 'Svg'
import css from './SubscriptionTransparencyText.css'

const SubscriptionTransparencyText = () => (
  <div className={css.container}>
    <Svg className={css.tick} fileName="icon-success-tick" />
    <div className={css.text}>
      <span className={css.highlighted}>No commitment. No cancellation fees.</span>{' '}
      <span>Skip a box or cancel your subscription online at anytime.</span>
    </div>
  </div>
)

export { SubscriptionTransparencyText }
