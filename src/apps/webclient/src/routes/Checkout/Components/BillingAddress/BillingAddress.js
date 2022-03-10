import React from 'react'
import PropTypes from 'prop-types'
import CheckBox from 'Form/CheckBox'
import { BillingAddressContainer } from './AddressContainer'
import css from './BillingAddress.css'
import checkoutCss from '../../Checkout.css'

export class BillingAddress extends React.PureComponent {
  toggleDeliveryAddress = () => {
    const { formValues, sectionName, form, change } = this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    change(form, `${sectionName}.isBillingAddressDifferent`, !isBillingAddressDifferent)
  }

  render() {
    const { formValues, sectionName, asyncValidate, form, receiveRef, scrollToFirstMatchingRef } =
      this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    return (
      <div className={css.container} data-testing="checkoutBillingAddressContainer">
        <div className={checkoutCss.fieldHeader}>Billing address</div>
        <CheckBox
          checked={!isBillingAddressDifferent}
          childLabelClassName={css.checkboxLabel}
          dataTesting="checkoutBillingAddressToggle"
          label="My billing address is the same as my delivery address"
          onChange={this.toggleDeliveryAddress}
        />
        {isBillingAddressDifferent ? (
          <div className={css.addressContainer}>
            <BillingAddressContainer
              isDelivery={false}
              asyncValidate={asyncValidate}
              formName={form}
              sectionName={sectionName}
              formValues={formValues || {}}
              onSaveAction={this.toggleDeliveryAddress}
              receiveRef={receiveRef}
              scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

BillingAddress.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
  sectionName: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  asyncValidate: PropTypes.func,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
}

BillingAddress.defaultProps = {
  asyncValidate: () => {},
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
}
