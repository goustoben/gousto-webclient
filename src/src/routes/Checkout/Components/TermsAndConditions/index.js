import React from 'react'
import configRoutes from 'config/routes'
import config from 'config/checkout'
import Link from 'Link'
import css from './TermsAndConditions.css'

const TermsAndConditions = () => (
  <div className={css.centeredSmallTextWithTopMargin}>
    <span>{config.terms}</span>&nbsp;
    <Link to={configRoutes.client.termsAndConditions} className={css.link} target="_blank" rel="noopener noreferrer">
      terms and conditions
    </Link>
  </div>
)

export default TermsAndConditions
