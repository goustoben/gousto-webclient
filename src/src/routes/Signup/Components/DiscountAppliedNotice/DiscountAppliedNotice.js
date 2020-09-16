import React from 'react'
import config from 'config/signup'
import css from './DiscountAppliedNotice.css'

export const DiscountAppliedNotice = () => (
  <div className={css.discountAppliedNotice}>
    <i className={css.tick} />
    <span>{config.boxSizeStep.discountApplied}</span>
  </div>
)
