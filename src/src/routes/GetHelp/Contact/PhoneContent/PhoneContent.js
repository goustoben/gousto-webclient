import React from 'react'

import { telephone } from 'config/company'

import css from './PhoneContent.css'

const PhoneContent = () => (
  <div>
    Call us on&nbsp;
    <a className={css.visibleOnlyOnMobile} href={`tel:${telephone.link}`}>{telephone.number}</a>
    <span className={css.hiddenOnMobile}>{telephone.number}</span>
    . We are available on weekdays from 9:00am - 7:45pm, and on weekends from 10:00am - 6:45pm
  </div>
)

export default PhoneContent
