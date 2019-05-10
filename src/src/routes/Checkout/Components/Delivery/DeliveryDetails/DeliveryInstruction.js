/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import classnames from 'classnames'
import configCheckout from 'config/checkout'
import css from '../Delivery.css'
import CheckoutTooltip from '../../CheckoutTooltip/CheckoutTooltip'

const LEAVE_BOX_OPTIONS = configCheckout.leaveBoxOptions.map(option => ({ value: option, label: option }))

class DeliveryInstruction extends React.PureComponent {

  static propTypes = {
    value: PropTypes.any,
    reset: PropTypes.func.isRequired,
    receiveRef: PropTypes.func,
    sectionName: PropTypes.string,
  }

  static defaultProps = {
    value: '',
    receiveRef: () => {},
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldShowOtherInput(this.props.value) && !this.shouldShowOtherInput(nextProps.value)) {
      this.props.reset('deliveryInstructionsCustom')
    }
  }

  shouldShowOtherInput = chosenValue =>
    ['neighbour', 'other'].includes(chosenValue.toLowerCase())

  render() {
    const inputSuffix = (<div className={css.checkoutTooltip}>
      <CheckoutTooltip version="Desktop">
        {configCheckout.tooltip.leaveBox}
      </CheckoutTooltip>
      <CheckoutTooltip version="Mobile" placement="topRight">
        {configCheckout.tooltip.leaveBox}
      </CheckoutTooltip>
                        </div>)

    const showOtherInput = this.shouldShowOtherInput(this.props.value)

    return (
      <div className={css.deliveryFieldWrapper}>
        <div className={css.row}>
          <div className={css.colMD}>
            <div className="deliveryDropdown">
              <Field
                name="deliveryInstruction"
                component={ReduxFormInput}
                inputSuffix={inputSuffix}
                options={LEAVE_BOX_OPTIONS}
                inputType="DropDown"
                label="Where should we leave your box if you aren't in?"
                mask
                withRef
                ref={this.props.receiveRef}
                refId={`${this.props.sectionName}.deliveryInstruction`}
              />
            </div>
          </div>
        </div>
        {showOtherInput &&
          <div className={classnames(css.row, css.deliveryField)}>
            <div className={css.colMD}>
              <Field
                name="deliveryInstructionsCustom"
                component={ReduxFormInput}
                inputType="Input"
                required
                color="gray"
                label={configCheckout.leaveBoxDesc[this.props.value.toLowerCase()]}
                mask
                withRef
                ref={this.props.receiveRef}
                refId={`${this.props.sectionName}.deliveryInstructionsCustom`}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default DeliveryInstruction
