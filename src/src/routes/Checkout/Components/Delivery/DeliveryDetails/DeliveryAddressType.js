/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import configCheckout from 'config/checkout'
import CheckoutTooltip from '../../CheckoutTooltip/CheckoutTooltip'
import css from '../Delivery.css'

const DELIVER_TO_OPTIONS = configCheckout.deliverToOptions
const addressTypeTooltip = configCheckout.tooltip.addressType

class DeliveryAddressType extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    const { value, reset } = this.props
    if (this.shouldShowOtherInput(value) && !this.shouldShowOtherInput(nextProps.value)) {
      reset('customAddressType')
    }
  }

  shouldShowOtherInput = chosenValue =>
    chosenValue.toLowerCase() === 'other'

  renderInputSuffix = () => (
    <div className={css.checkoutTooltip}>
      <CheckoutTooltip version="Desktop">{addressTypeTooltip}</CheckoutTooltip>
      <CheckoutTooltip version="Mobile" placement="top">{addressTypeTooltip}</CheckoutTooltip>
    </div>
  )

  render() {
    const { value, receiveRef, sectionName, isOldCheckoutFieldEnabled } = this.props
    const showOtherInput = this.shouldShowOtherInput(value)
    const inputSuffix = isOldCheckoutFieldEnabled && this.renderInputSuffix()

    return (
      <div className={css.deliveryFieldWrapper}>
        <div className={css.row}>
          <div className={css.colOneThrice}>
            <div className="deliveryDropdown">
              <Field
                name="addressType"
                component={ReduxFormInput}
                options={DELIVER_TO_OPTIONS}
                inputType="DropDown"
                label="Address type"
                withRef
                ref={receiveRef}
                refId={`${sectionName}.addressType`}
                inputSuffix={inputSuffix}
                color="secondary"
              />
            </div>
          </div>
        </div>
        {showOtherInput && (
          <div className={classnames(css.row, css.deliveryField)}>
            <div className={css.colMD}>
              <Field
                name="customAddressType"
                component={ReduxFormInput}
                inputType="Input"
                placeholder="Other type of address"
                required
                color="gray"
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.customAddressType`}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

DeliveryAddressType.propTypes = {
  value: PropTypes.any,
  reset: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  isOldCheckoutFieldEnabled: PropTypes.bool,
}

DeliveryAddressType.defaultProps = {
  value: '',
  receiveRef: () => {},
  sectionName: 'delivery',
  isOldCheckoutFieldEnabled: false,
}

export default DeliveryAddressType
