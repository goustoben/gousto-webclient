import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'

import { PaymentMethod } from 'config/signup'

import { PaymentMethodListItem } from './PaymentMethodListItem'

import css from './PaymentMethodSelector.css'

export const PaymentMethodSelector = ({
  currentPaymentMethod,
  setCurrentPaymentMethod,
  isPayPalReady,
}) => {
  const methodDescriptors = [
    {
      paymentMethod: PaymentMethod.Card,
      leftItem: {
        itemType: 'label',
        text: 'Card payment',
      },
      rightItem: {
        itemType: 'svg',
        className: css.cardsIcon,
        fileName: 'payment-method-4-cards',
      },
    },
    {
      paymentMethod: PaymentMethod.PayPal,
      leftItem: {
        itemType: 'svg',
        className: css.paypalIcon,
        fileName: 'payment-method-paypal',
      },
      rightItem: {
        itemType: 'label',
        className: css.paypalConnectedLabel,
        text: 'Connected',
        hide: !isPayPalReady,
      },
    },
  ]

  return (
    <ul className={classNames(css.paymentMethods, { [css.hide]: isPayPalReady })}>
      {methodDescriptors.map((methodDescriptor) => (
        <PaymentMethodListItem
          key={methodDescriptor.paymentMethod}
          methodDescriptor={methodDescriptor}
          currentPaymentMethod={currentPaymentMethod}
          setCurrentPaymentMethod={setCurrentPaymentMethod}
        />
      ))}
    </ul>
  )
}

PaymentMethodSelector.propTypes = {
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired,
  isPayPalReady: PropTypes.bool.isRequired,
}
