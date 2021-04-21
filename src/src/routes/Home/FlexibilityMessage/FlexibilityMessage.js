import React from 'react'
import classNames from 'classnames'
import typography from 'design-language/typography.module.css'
import css from './FlexibilityMessage.module.css'

export const FlexibilityMessage = () => (
  <div className={classNames(css.container)}>
    <span className={css.tick} />
    <div className={typography.fontStyleSubHead}>
      <span className={css.heading}>No commitment. No cancellation fees.</span>
      <span className={typography.fontStyleBody}>Pause or cancel for free anytime.</span>
    </div>
  </div>
)
