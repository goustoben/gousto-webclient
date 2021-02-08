import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputRadio } from 'goustouicomponents'
import Svg from 'Svg'
import { methodDescriptorPropType } from './propTypes'
import css from './PaymentMethodSelectorCheckoutOverhaul.css'

export const PaymentMethodToggle = ({ methodDescriptor, isActive, setCurrentPaymentMethod }) => {
  const { paymentMethod, leftItem, rightItem } = methodDescriptor

  const renderItem = (item) => {
    const { itemType } = item
    switch (itemType) {
    case 'label': {
      const { text, className, hide } = item

      return <div className={classNames(className, { [css.hide]: hide })}>{text}</div>
    }
    case 'svg': {
      const { className, fileName } = item

      return <Svg className={className} fileName={fileName} />
    }
    default: {
      return null
    }
    }
  }

  return (
    <div className={css.paymentMethodToggle}>
      <InputRadio
        id={paymentMethod}
        value={paymentMethod}
        name="paymentMethod"
        isChecked={isActive}
        onChange={() => setCurrentPaymentMethod(paymentMethod)}
      >
        <div className={css.flex}>
          {renderItem(leftItem)}
          {renderItem(rightItem)}
        </div>
      </InputRadio>
    </div>
  )
}

PaymentMethodToggle.propTypes = {
  methodDescriptor: methodDescriptorPropType.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

PaymentMethodToggle.defaultProps = {
  isActive: false,
}
