import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { transformAddresses } from '../../utils/delivery'

import addressCss from './Address.css'
import postcodeCss from './Postcode.css'
import redesignCss from '../../CheckoutRedesignContainer.css'

const Postcode = ({
  postcodePending,
  onPostcodeLookup,
  postcodeTemp,
  addresses,
  onSelectedAddressChange,
  showDropdown,
  receiveRef,
  trackClick,
  isMobile,
  isCheckoutOverhaulEnabled,
  isAddressSelected,
}) => {
  const [isFindAddressDisabled, setIsFindAddressDisabled] = useState(true)
  const handlePostCodeSearch = () => {
    onPostcodeLookup(postcodeTemp)
    if (isCheckoutOverhaulEnabled) {
      setIsFindAddressDisabled(true)
    }
  }

  const addressOptions =
    addresses.length > 0 ? transformAddresses(addresses, isCheckoutOverhaulEnabled) : []

  return (
    <Fragment>
      <div
        className={classNames({
          [addressCss.flex]: !isCheckoutOverhaulEnabled,
          [postcodeCss.postcodeContainer]: isCheckoutOverhaulEnabled,
        })}
      >
        <div
          className={classNames(postcodeCss.postCodeField, {
            [redesignCss.inputContainer]: isCheckoutOverhaulEnabled,
            [postcodeCss.postCodeFieldRedesign]: isCheckoutOverhaulEnabled,
          })}
        >
          <Field
            name="postcodeTemp"
            component={ReduxFormInput}
            inputType="Input"
            color="gray"
            label="Postcode"
            mask
            withRef
            ref={receiveRef}
            data-testing="checkoutPostcode"
            isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
            onChange={() => setIsFindAddressDisabled(false)}
            autocompleteOff
          />
        </div>
        <div
          className={classNames(postcodeCss.findAddressButton, {
            [postcodeCss.searchCTA]: isCheckoutOverhaulEnabled,
          })}
        >
          <CheckoutButton
            testingSelector="checkoutFindAddressButton"
            color="secondary"
            onClick={handlePostCodeSearch}
            pending={isCheckoutOverhaulEnabled ? false : postcodePending}
            isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
            isDisabled={isCheckoutOverhaulEnabled && isFindAddressDisabled}
            width="auto"
            isFullWidth={false}
            stepName={isCheckoutOverhaulEnabled ? 'Search' : 'Find Address'}
          />
        </div>
      </div>
      {(addresses.length > 0 && showDropdown && !isCheckoutOverhaulEnabled) ||
      (isCheckoutOverhaulEnabled && !isAddressSelected) ? (
        <div>
          {!isCheckoutOverhaulEnabled && <br />}
          <div
            className={classNames({ [postcodeCss.deliveryDropdown]: isCheckoutOverhaulEnabled })}
            data-testing="checkoutAddressDropdown"
          >
            <Field
              name="addressId"
              component={ReduxFormInput}
              options={addressOptions}
              onChange={(event, addressId) => {
                if (isMobile) trackClick('DeliveryAddress Selected')
                onSelectedAddressChange(event, addressId)
              }}
              inputType="DropDown"
              label={isCheckoutOverhaulEnabled ? '' : 'Select your address'}
              color="secondary"
              mask
              withRef
              ref={receiveRef}
              dataTesting="houseNo"
              isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

Postcode.propTypes = {
  postcodePending: PropTypes.bool,
  onPostcodeLookup: PropTypes.func,
  postcodeTemp: PropTypes.string,
  addresses: PropTypes.instanceOf(Immutable.List),
  onSelectedAddressChange: PropTypes.func,
  showDropdown: PropTypes.bool,
  receiveRef: PropTypes.func,
  isMobile: PropTypes.bool,
  trackClick: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  isAddressSelected: PropTypes.bool,
}

Postcode.defaultProps = {
  postcodePending: false,
  onPostcodeLookup: () => {},
  postcodeTemp: '',
  addresses: Immutable.List(),
  onSelectedAddressChange: () => {},
  showDropdown: false,
  receiveRef: () => {},
  trackClick: () => {},
  isMobile: false,
  isCheckoutOverhaulEnabled: false,
  isAddressSelected: false,
}

export { Postcode }
