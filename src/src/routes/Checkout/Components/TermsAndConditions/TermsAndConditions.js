import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import configRoutes from 'config/routes'
import config from 'config/checkout'
import Link from 'Link'
import css from './TermsAndConditions.css'

export const TermsAndConditions = ({ isCheckoutOverhaulEnabled }) => (
  <div
    className={classNames(css.centeredSmallTextWithTopMargin, {
      [css.checkoutOverhaulTermsAndConditions]: isCheckoutOverhaulEnabled,
    })}
  >
    <span>{config.terms}</span>
    {isCheckoutOverhaulEnabled ? <br /> : <Fragment>&nbsp;</Fragment>}
    <Link
      to={configRoutes.client.termsAndConditions}
      className={classNames(css.link, { [css.checkoutOverhaulLink]: isCheckoutOverhaulEnabled })}
      target="_blank"
      rel="noopener noreferrer"
    >
      {isCheckoutOverhaulEnabled ? 'Terms and Conditions' : 'terms and conditions'}
    </Link>
  </div>
)

TermsAndConditions.propTypes = {
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

TermsAndConditions.defaultProps = {
  isCheckoutOverhaulEnabled: false,
}
