import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { PaymentMethod } from 'config/signup'
import { PaymentMethodSelectorListItem } from './PaymentMethodSelectorListItem'
import css from './PaymentMethodSelector.css'

export const PaymentMethodSelector = ({ currentPaymentMethod, onPaymentMethodChanged, showSelector }) => {
  const methods = [
    { method: PaymentMethod.Card, label: 'Card Payment', icon: css.visaMastercardIcon, filename: 'payment-method-visa-mastercard' },
    { method: PaymentMethod.PayPal, icon: css.paypalIcon, filename: 'payment-method-paypal' },
  ]

  return (
    <div>
      <p className={css.header}>Payment method</p>
      {showSelector && (
        <ul className={css.list}>
          {methods.map(({method, label, icon, filename}) => (
            <PaymentMethodSelectorListItem
              paymentMethod={method}
              currentPaymentMethod={currentPaymentMethod}
              onPaymentMethodChanged={onPaymentMethodChanged}
              key={method}
            >
              {label && <span>{label}</span>}
              <Svg className={icon} fileName={filename} />
            </PaymentMethodSelectorListItem>
          ))}
        </ul>
      )}
    </div>
  )
}

PaymentMethodSelector.propTypes = {
  currentPaymentMethod: PropTypes.string.isRequired,
  onPaymentMethodChanged: PropTypes.func.isRequired,
  showSelector: PropTypes.bool.isRequired,
}
