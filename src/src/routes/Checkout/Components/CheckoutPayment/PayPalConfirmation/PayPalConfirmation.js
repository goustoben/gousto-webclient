import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { onEnter } from 'utils/accessibility'

import css from './PayPalConfirmation.css'

export const PayPalConfirmation = ({ resetPaymentMethod, isSubmitting }) => {
  const payPalIcon = <Svg className={css.paypalIcon} fileName="paypal" />
  const changePaymentMethodCTA = (
    <div className={css.paypalAlternativeText}>
      or&nbsp;
      <span
        role="button"
        tabIndex="0"
        className={css.resetPaymentMethod}
        onClick={resetPaymentMethod}
        onKeyDown={onEnter(resetPaymentMethod)}
      >
        Change payment method
      </span>
    </div>
  )

  return (
    <Fragment>
      <div className={css.container}>
        <Svg className={css.successTickIcon} fileName="icon-success-tick" />
        <div className={css.message}>You’re set to pay with</div>
        {payPalIcon}
      </div>
      {isSubmitting || changePaymentMethodCTA}
    </Fragment>
  )
}

PayPalConfirmation.propTypes = {
  resetPaymentMethod: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
}

PayPalConfirmation.defaultProps = {
  isSubmitting: false,
}
