import React from 'react'
import PropTypes from 'prop-types'
import { PaymentMethod } from 'config/signup'
import { PaymentMethodListItem } from './PaymentMethodListItem'
import css from './PaymentMethodSelectorCheckoutOverhaul.css'

export const PaymentMethodSelectorCheckoutOverhaul = ({
  currentPaymentMethod,
  setCurrentPaymentMethod,
  isPayPalReady,
  renderCardContent,
  renderPaypalContent,
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
      renderContent: renderCardContent,
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
      renderContent: renderPaypalContent,
      hideContent: isPayPalReady,
    },
  ]

  return (
    <ul className={css.paymentMethods}>
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

PaymentMethodSelectorCheckoutOverhaul.propTypes = {
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired,
  isPayPalReady: PropTypes.bool.isRequired,
  renderCardContent: PropTypes.func.isRequired,
  renderPaypalContent: PropTypes.func.isRequired,
}
