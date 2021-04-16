import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Svg from 'Svg'
import { onEnter } from 'utils/accessibility'

import css from './PayPalConfirmation.css'

export const PayPalConfirmation = ({
  resetPaymentMethod,
  isSubmitting,
  isCheckoutOverhaulEnabled,
}) => {
  const payPalIcon = <Svg className={css.paypalIcon} fileName="paypal" />
  const changePaymentMethodCTA = (
    <div
      className={classNames(css.paypalAlternativeText, {
        [css.checkoutVariationText]: isCheckoutOverhaulEnabled,
      })}
    >
      or&nbsp;
      <span
        role="button"
        tabIndex="0"
        className={classNames(css.resetPaymentMethod, {
          [css.checkoutVariationLink]: isCheckoutOverhaulEnabled,
        })}
        onClick={resetPaymentMethod}
        onKeyDown={onEnter(resetPaymentMethod)}
      >
        Change payment method
      </span>
    </div>
  )

  if (isCheckoutOverhaulEnabled) {
    return (
      <Fragment>
        <div className={css.checkoutVariationContainer}>
          <Svg className={css.successTickIcon} fileName="icon-success-tick" />
          <div className={css.checkoutVariationMessage}>You’re set to pay with</div>
          {payPalIcon}
        </div>
        {isSubmitting || changePaymentMethodCTA}
      </Fragment>
    )
  }

  return (
    <div className={css.text}>
      <span className={css.checkmarkIcon} />
      Great, you’re all set to pay with&nbsp;
      {payPalIcon}
      <br />
      {isSubmitting || changePaymentMethodCTA}
    </div>
  )
}

PayPalConfirmation.propTypes = {
  resetPaymentMethod: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

PayPalConfirmation.defaultProps = {
  isSubmitting: false,
  isCheckoutOverhaulEnabled: false,
}
