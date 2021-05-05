import React from 'react'
import configRoutes from 'config/routes'
import config from 'config/checkout'
import Link from 'Link'
import css from './TermsAndConditions.css'

export const TermsAndConditions = () => (
  <div className={css.termsAndConditions}>
    <span>{config.terms}</span>
    <br />
    <Link
      to={configRoutes.client.termsAndConditions}
      className={css.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Terms and Conditions
    </Link>
  </div>
)
