import React from 'react'

import { signupConfig } from 'routes/Signup/signupConfig'

import css from './DiscountAppliedNotice.css'

export const DiscountAppliedNotice = () => (
  <div className={css.discountAppliedNotice}>
    <i className={css.tick} />
    <span>{signupConfig.boxSizeStep.discountApplied}</span>
  </div>
)
