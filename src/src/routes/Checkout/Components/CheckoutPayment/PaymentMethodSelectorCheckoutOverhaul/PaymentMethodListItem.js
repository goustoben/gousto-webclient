import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { methodDescriptorPropType } from './propTypes'
import { PaymentMethodToggle } from './PaymentMethodToggle'
import css from './PaymentMethodSelectorCheckoutOverhaul.css'

export const PaymentMethodListItem = ({
  methodDescriptor,
  currentPaymentMethod,
  setCurrentPaymentMethod,
}) => {
  const { paymentMethod, renderContent, hideContent } = methodDescriptor
  const isActive = paymentMethod === currentPaymentMethod

  return (
    <li
      className={classNames(css.paymentMethodListItem, {
        [css.paymentMethodListItemIsActive]: isActive,
      })}
    >
      <PaymentMethodToggle
        methodDescriptor={methodDescriptor}
        isActive={isActive}
        setCurrentPaymentMethod={setCurrentPaymentMethod}
      />
      <div
        className={classNames(css.paymentMethodContent, { [css.hide]: !isActive || hideContent })}
      >
        {renderContent()}
      </div>
    </li>
  )
}

PaymentMethodListItem.propTypes = {
  methodDescriptor: methodDescriptorPropType.isRequired,
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired,
}
