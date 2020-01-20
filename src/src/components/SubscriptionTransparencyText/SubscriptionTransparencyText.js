import React from 'react'
import css from './SubscriptionTransparencyText.css'

const SubscriptionTransparencyText = () => (
  <p className={css.helperText}>
    <span className={css.helperHighlighted}>
      <i className={css.tick} />
      No commitment. No cancellation fees. &nbsp;
    </span>
    Skip a box or cancel your subscription online at anytime.
  </p>
)

export { SubscriptionTransparencyText }
