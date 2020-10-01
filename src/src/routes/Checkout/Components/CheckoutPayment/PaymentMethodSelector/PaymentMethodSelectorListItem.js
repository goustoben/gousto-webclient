import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputRadio } from 'goustouicomponents'
import css from './PaymentMethodSelectorListItem.css'

export const PaymentMethodSelectorListItem = ({
  paymentMethod,
  currentPaymentMethod,
  onPaymentMethodChanged,
  children
}) => {
  const isActive = paymentMethod === currentPaymentMethod

  return (
    <li className={classNames(css.listItem, { [css.isActive]: isActive })}>
      <InputRadio
        value={paymentMethod}
        name="paymentMethod"
        isChecked={isActive}
        onChange={() => onPaymentMethodChanged(paymentMethod)}
      >
        <div className={css.content}>{children}</div>
      </InputRadio>
    </li>
  )
}

PaymentMethodSelectorListItem.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  currentPaymentMethod: PropTypes.string.isRequired,
  onPaymentMethodChanged: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
