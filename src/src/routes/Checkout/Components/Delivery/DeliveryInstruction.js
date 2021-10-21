import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import classNames from 'classnames'
import { checkoutConfig } from 'config/checkout'
import css from './Delivery.css'
import checkoutCss from '../../Checkout.css'

const LEAVE_BOX_OPTIONS = checkoutConfig.leaveBoxOptions
  .filter((option) => option)
  .map((option) => ({ value: option, label: option }))

class DeliveryInstruction extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { value, reset } = this.props
    if (this.shouldShowOtherInput(prevProps.value) && !this.shouldShowOtherInput(value)) {
      reset('deliveryInstructionsCustom')
    }
  }

  shouldShowOtherInput = (chosenValue) => ['neighbour', 'other'].includes(chosenValue.toLowerCase())

  render() {
    const { value, sectionName, receiveRef, isMobile } = this.props
    const showOtherInput = this.shouldShowOtherInput(value)
    const otherInputPlaceholder =
      value.toLowerCase() === 'neighbour'
        ? 'e.g. next door at number 10'
        : 'e.g. lockbox around left side of house'

    return (
      <div className={css.deliveryFieldWrapper}>
        <div className={css.row}>
          <div className={checkoutCss.inputContainer}>
            <div className="deliveryDropdown">
              <Field
                name="deliveryInstruction"
                component={ReduxFormInput}
                options={LEAVE_BOX_OPTIONS}
                inputType="DropDown"
                label="Where can we leave your box if you're not in?"
                mask
                forwardRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstruction`}
                color="secondary"
                dataTesting="checkoutDeliveryDetailsInstruction"
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
        {showOtherInput && (
          <div className={classNames(css.row, css.deliveryField)}>
            <div className={checkoutCss.inputContainer}>
              <Field
                name="deliveryInstructionsCustom"
                component={ReduxFormInput}
                inputType="Input"
                required
                color="gray"
                mask
                forwardRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstructionsCustom`}
                placeholder={otherInputPlaceholder}
                data-testing="checkoutDeliveryDetailsExtraInfo"
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

DeliveryInstruction.propTypes = {
  value: PropTypes.string,
  reset: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  isMobile: PropTypes.bool,
}

DeliveryInstruction.defaultProps = {
  value: '',
  receiveRef: () => {},
  sectionName: 'delivery',
  isMobile: true,
}

export { DeliveryInstruction }
