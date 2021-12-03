import React from 'react'

import { telephone } from 'config/company'

import css from './PhoneContent.module.css'

const PhoneContent = () => (
  <div>
    Call us on&nbsp;
    <a className={css.visibleOnlyOnMobile} href={`tel:${telephone.link}`}>{telephone.number}</a>
    <span className={css.hiddenOnMobile}>{telephone.number}</span>
    . We are available Monday - Sunday from 8:30am - 7:45pm.
  </div>
)

export {
  PhoneContent
}
