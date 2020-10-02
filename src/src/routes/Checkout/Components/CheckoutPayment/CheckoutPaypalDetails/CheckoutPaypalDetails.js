import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './CheckoutPaypalDetails.css'

const texts = {
  intro: 'You will be prompted by PayPal for payment details to securely setup your subscription.'
}

export const CheckoutPaypalDetails = ({ hide }) => (
  <div className={classNames({ [css.hide]: hide })}>
    <div className={css.intro}>
      <span className={css.padlockIcon} />
      {texts.intro}
      <i>This payment method is not available yet.</i>
    </div>
  </div>
)

CheckoutPaypalDetails.propTypes = {
  hide: PropTypes.bool
}

CheckoutPaypalDetails.defaultProps = {
  hide: false
}
