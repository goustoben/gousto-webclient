/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import classnames from 'classnames'
import configCheckout from 'config/checkout'
import CheckoutTooltip from '../../CheckoutTooltip/CheckoutTooltip'
import css from '../Delivery.css'

const LEAVE_BOX_OPTIONS = configCheckout.leaveBoxOptions.map(option => ({ value: option, label: option }))
const leaveBoxTooltip = configCheckout.tooltip.leaveBox

class DeliveryInstruction extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    const { value, reset } = this.props
    if (this.shouldShowOtherInput(value) && !this.shouldShowOtherInput(nextProps.value)) {
      reset('deliveryInstructionsCustom')
    }
  }

  shouldShowOtherInput = chosenValue =>
    ['neighbour', 'other'].includes(chosenValue.toLowerCase())

  renderTooltip = () => (
    <div className={css.checkoutTooltip}>
      <CheckoutTooltip version="Desktop">{leaveBoxTooltip}</CheckoutTooltip>
      <CheckoutTooltip version="Mobile" placement="topRight">{leaveBoxTooltip}</CheckoutTooltip>
    </div>
  )

  render() {
    const { value, sectionName, receiveRef, isOldCheckoutFieldEnabled } = this.props
    const showOtherInput = this.shouldShowOtherInput(value)
    const inputSuffix = isOldCheckoutFieldEnabled && this.renderTooltip()

    return (
      <div className={css.deliveryFieldWrapper}>
        <div className={css.row}>
          <div className={css.colMD}>
            <div className="deliveryDropdown" data-testing="checkoutDeliveryDetailsInstruction">
              <Field
                name="deliveryInstruction"
                component={ReduxFormInput}
                options={LEAVE_BOX_OPTIONS}
                inputType="DropDown"
                label="Where should we leave your box if you aren't in?"
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstruction`}
                color="secondary"
                inputSuffix={inputSuffix}
              />
            </div>
          </div>
        </div>
        {showOtherInput && (
          <div className={classnames(css.row, css.deliveryField)}>
            <div className={css.colMD}>
              <Field
                name="deliveryInstructionsCustom"
                component={ReduxFormInput}
                inputType="Input"
                required
                color="gray"
                label={configCheckout.leaveBoxDesc[value.toLowerCase()]}
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstructionsCustom`}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

DeliveryInstruction.propTypes = {
  value: PropTypes.any,
  reset: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  isOldCheckoutFieldEnabled: PropTypes.bool,
}

DeliveryInstruction.defaultProps = {
  value: '',
  receiveRef: () => {},
  sectionName: 'delivery',
  isOldCheckoutFieldEnabled: false,
}

export default DeliveryInstruction
