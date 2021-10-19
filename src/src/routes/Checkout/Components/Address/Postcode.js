import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { transformAddresses } from '../../utils/delivery'

import postcodeCss from './Postcode.css'
import checkoutCss from '../../Checkout.css'

const Postcode = ({
  onPostcodeLookup,
  postcodeTemp,
  addresses,
  onSelectedAddressChange,
  receiveRef,
  trackClick,
  isMobile,
  isAddressSelected,
}) => {
  const [isFindAddressDisabled, setIsFindAddressDisabled] = useState(true)
  const handlePostCodeSearch = () => {
    onPostcodeLookup(postcodeTemp)
    setIsFindAddressDisabled(true)
  }

  const addressOptions = addresses.length > 0 ? transformAddresses(addresses) : []

  return (
    <Fragment>
      <div className={postcodeCss.postcodeContainer}>
        <div className={classNames(postcodeCss.postCodeField, checkoutCss.inputContainer)}>
          <Field
            name="postcodeTemp"
            component={ReduxFormInput}
            inputType="Input"
            color="gray"
            label="Postcode"
            mask
            forwardRef
            ref={receiveRef}
            data-testing="checkoutPostcode"
            onChange={() => setIsFindAddressDisabled(false)}
            autocompleteOff
          />
        </div>
        <div className={classNames(postcodeCss.findAddressButton, postcodeCss.searchCTA)}>
          <CheckoutButton
            testingSelector="checkoutFindAddressButton"
            color="secondary"
            onClick={handlePostCodeSearch}
            pending={false}
            isDisabled={isFindAddressDisabled}
            width="auto"
            isFullWidth={false}
          >
            Search
          </CheckoutButton>
        </div>
      </div>
      {!isAddressSelected ? (
        <div className={postcodeCss.deliveryDropdown} data-testing="checkoutAddressDropdown">
          <Field
            name="addressId"
            component={ReduxFormInput}
            options={addressOptions}
            onChange={(event, addressId) => {
              if (isMobile) trackClick('DeliveryAddress Selected')
              onSelectedAddressChange(event, addressId)
            }}
            inputType="DropDown"
            color="secondary"
            mask
            forwardRef
            ref={receiveRef}
            dataTesting="houseNo"
            isMobile={isMobile}
          />
        </div>
      ) : null}
    </Fragment>
  )
}

Postcode.propTypes = {
  onPostcodeLookup: PropTypes.func,
  postcodeTemp: PropTypes.string,
  addresses: PropTypes.instanceOf(Immutable.List),
  onSelectedAddressChange: PropTypes.func,
  receiveRef: PropTypes.func,
  isMobile: PropTypes.bool,
  trackClick: PropTypes.func,
  isAddressSelected: PropTypes.bool,
}

Postcode.defaultProps = {
  onPostcodeLookup: () => {},
  postcodeTemp: '',
  addresses: Immutable.List(),
  onSelectedAddressChange: () => {},
  receiveRef: () => {},
  trackClick: () => {},
  isMobile: false,
  isAddressSelected: false,
}

export { Postcode }
