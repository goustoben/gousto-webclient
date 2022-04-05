import React from 'react'

import { telephone } from 'config/company'

import css from './PhoneContent.css'

const PhoneContent = () => (
  <div>
    Call us on&nbsp;
    <a className={css.visibleOnlyOnMobile} href={`tel:${telephone.link}`}>{telephone.number}</a>
    <span className={css.hiddenOnMobile}>{telephone.number}</span>
    . We’re available Monday - Friday from 8.30am&nbsp;-&nbsp;9.45pm. Saturday & Sunday from 8.30am - 7.45pm.
  </div>
)

export {
  PhoneContent
}
