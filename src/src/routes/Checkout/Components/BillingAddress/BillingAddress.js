import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckBox from 'Form/CheckBox'
import { showAddress } from 'routes/Checkout/utils/delivery'
import { onEnter } from 'utils/accessibility'
import { BillingAddressContainer } from './AddressContainer'
import css from './BillingAddress.css'
import redesignCss from '../../CheckoutRedesignContainer.css'

export class BillingAddress extends React.PureComponent {
  toggleDeliveryAddress = () => {
    const { formValues, sectionName, form, change } = this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    change(form, `${sectionName}.isBillingAddressDifferent`, !isBillingAddressDifferent)
  }

  render() {
    const {
      formValues,
      sectionName,
      deliveryAddress,
      asyncValidate,
      form,
      receiveRef,
      scrollToFirstMatchingRef,
      isCheckoutOverhaulEnabled,
    } = this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    if (isCheckoutOverhaulEnabled) {
      return (
        <div className={classNames({ [css.variationContainer]: isCheckoutOverhaulEnabled })}>
          <div className={redesignCss.fieldHeader}>Billing address</div>
          <CheckBox
            checked={!isBillingAddressDifferent}
            childLabelClassName={css.checkboxLabel}
            dataTesting="checkout_payment_toggle"
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
                isCheckoutOverhaulEnabled
              />
            </div>
          ) : null}
        </div>
      )
    } else {
      const toggleAddressText = isBillingAddressDifferent
        ? 'Use Delivery address'
        : 'Enter new billing address'

      return (
        <div>
          <p>Billing Address</p>
          {!isBillingAddressDifferent && (
            <p className={css.textSMWithBottomMargin} data-testing="checkoutBillingAddress">
              {showAddress(deliveryAddress)}
            </p>
          )}
          <p>
            <span
              role="button"
              tabIndex="0"
              data-testing="checkout_payment_toggle"
              className={css.link}
              onClick={this.toggleDeliveryAddress}
              onKeyDown={onEnter(this.toggleDeliveryAddress)}
            >
              {toggleAddressText}
              &nbsp;
              <span className={css.linkRight} />
            </span>
          </p>
          {isBillingAddressDifferent ? (
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
          ) : null}
        </div>
      )
    }
  }
}

BillingAddress.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  deliveryAddress: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
  sectionName: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  asyncValidate: PropTypes.func,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

BillingAddress.defaultProps = {
  asyncValidate: () => {},
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
  isCheckoutOverhaulEnabled: false,
}
