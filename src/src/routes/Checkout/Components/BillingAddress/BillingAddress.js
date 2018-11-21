import React from 'react'
import PropTypes from 'prop-types'

import { showAddress } from 'routes/Checkout/utils/delivery'
import css from './BillingAddress.css'

import Address from './AddressContainer'

export class BillingAddress extends React.PureComponent {
  static propTypes = {
    deliveryAddress: PropTypes.object,
    formValues: PropTypes.object,
    sectionName: PropTypes.string,
    form: PropTypes.string,
    change: PropTypes.func,
    asyncValidate: PropTypes.func,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
  }

  toggleDeliveryAddress = () => {
    const { formValues, sectionName, form, change } = this.props
    const isBillingAddressDifferent = formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    change(form, `${sectionName}.isBillingAddressDifferent`, !isBillingAddressDifferent)
  }

  render() {
    const { formValues, sectionName, deliveryAddress, asyncValidate, form, receiveRef, scrollToFirstMatchingRef } = this.props
    const isBillingAddressDifferent = formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent
    const toggleAddressText = isBillingAddressDifferent ? 'Use Delivery address' : 'Enter new billing address'

    return (
      <div>
        <p>Billing Address</p>
        {!isBillingAddressDifferent && <p className={css.textSMWithBottomMargin}>{showAddress(deliveryAddress)}</p>}
        <p>
          <span
            data-testing="checkout_payment_toggle"
            className={css.link}
            onClick={this.toggleDeliveryAddress}
          >
            {toggleAddressText}&nbsp;
            <span className={css.linkRight} />
          </span>
        </p>
        {isBillingAddressDifferent ? <Address
          isDelivery={false}
          asyncValidate={asyncValidate}
          formName={form}
          sectionName={sectionName}
          formValues={formValues || {}}
          onSaveAction={this.toggleDeliveryAddress}
          receiveRef={receiveRef}
          scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        /> : null}
      </div>
    )
  }
}
