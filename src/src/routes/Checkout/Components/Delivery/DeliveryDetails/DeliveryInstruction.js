import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import classNames from 'classnames'
import configCheckout from 'config/checkout'
import css from '../Delivery.css'
import redesignCss from '../../../CheckoutRedesignContainer.css'

const LEAVE_BOX_OPTIONS = (isCheckoutOverhaulEnabled) =>
  configCheckout
    .leaveBoxOptions(isCheckoutOverhaulEnabled)
    .filter((option) => option)
    .map((option) => ({ value: option, label: option }))

class DeliveryInstruction extends React.PureComponent {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, reset } = this.props
    if (this.shouldShowOtherInput(value) && !this.shouldShowOtherInput(nextProps.value)) {
      reset('deliveryInstructionsCustom')
    }
  }

  shouldShowOtherInput = (chosenValue) => ['neighbour', 'other'].includes(chosenValue.toLowerCase())

  render() {
    const { value, sectionName, receiveRef, isCheckoutOverhaulEnabled } = this.props
    const showOtherInput = this.shouldShowOtherInput(value)

    return (
      <div
        className={classNames(css.deliveryFieldWrapper, {
          [css.deliveryFieldWrapperRedesign]: isCheckoutOverhaulEnabled,
        })}
      >
        <div className={classNames(css.row, { [css.rowRedesign]: isCheckoutOverhaulEnabled })}>
          <div
            className={classNames(css.colMD, {
              [redesignCss.inputContainer]: isCheckoutOverhaulEnabled,
            })}
          >
            <div className="deliveryDropdown" data-testing="checkoutDeliveryDetailsInstruction">
              <Field
                name="deliveryInstruction"
                component={ReduxFormInput}
                options={LEAVE_BOX_OPTIONS(isCheckoutOverhaulEnabled)}
                inputType="DropDown"
                label={
                  isCheckoutOverhaulEnabled
                    ? "Where can we leave your box if you're not in?"
                    : "Where should we leave your box if you aren't in?"
                }
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstruction`}
                color="secondary"
                isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
              />
            </div>
          </div>
        </div>
        {showOtherInput && (
          <div
            className={classNames(css.row, css.deliveryField, {
              [css.rowRedesign]: isCheckoutOverhaulEnabled,
            })}
          >
            <div
              className={classNames(css.colMD, {
                [redesignCss.inputContainer]: isCheckoutOverhaulEnabled,
              })}
            >
              <Field
                name="deliveryInstructionsCustom"
                component={ReduxFormInput}
                inputType="Input"
                required
                color="gray"
                label={
                  isCheckoutOverhaulEnabled ? '' : configCheckout.leaveBoxDesc[value.toLowerCase()]
                }
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.deliveryInstructionsCustom`}
                isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
                placeholder="e.g. lockbox around left side of house"
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
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

DeliveryInstruction.defaultProps = {
  value: '',
  receiveRef: () => {},
  sectionName: 'delivery',
  isCheckoutOverhaulEnabled: false,
}

export { DeliveryInstruction }
