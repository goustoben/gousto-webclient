import React from 'react'
import Svg from 'Svg'
import css from './CustomerCareDetails.css'

export const CustomerCareDetails = () => (
  <div className={css.customerCareDetails}>
    <div className={css.customerCarePart}>
      <Svg className={css.customerCareIcon} fileName="icon-phone" />
      <span>020 3011 1002</span>
    </div>
    <div className={css.customerCarePart}>
      <Svg className={css.customerCareIcon} fileName="icon-details-email" />
      <span>info@gousto.co.uk</span>
    </div>
  </div>
)
