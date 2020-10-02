import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { PaymentMethod } from 'config/signup'
import { PaymentMethodSelectorListItem } from './PaymentMethodSelectorListItem'
import css from './PaymentMethodSelector.css'

export const PaymentMethodSelector = ({ currentPaymentMethod, onPaymentMethodChanged }) => (
  <div>
    <p className={css.header}>Payment method</p>
    <ul className={css.list}>
      <PaymentMethodSelectorListItem
        paymentMethod={PaymentMethod.Card}
        currentPaymentMethod={currentPaymentMethod}
        onPaymentMethodChanged={onPaymentMethodChanged}
      >
        <span>Card Payment</span>
        <Svg className={css.visaMastercardIcon} fileName="payment-method-visa-mastercard" />
      </PaymentMethodSelectorListItem>
      <PaymentMethodSelectorListItem
        paymentMethod={PaymentMethod.Paypal}
        currentPaymentMethod={currentPaymentMethod}
        onPaymentMethodChanged={onPaymentMethodChanged}
      >
        <Svg className={css.paypalIcon} fileName="payment-method-paypal" />
      </PaymentMethodSelectorListItem>
    </ul>
  </div>
)

PaymentMethodSelector.propTypes = {
  currentPaymentMethod: PropTypes.string.isRequired,
  onPaymentMethodChanged: PropTypes.func.isRequired
}
