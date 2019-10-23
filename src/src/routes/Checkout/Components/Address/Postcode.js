import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'

import { Button } from 'goustouicomponents'
import addressCss from './Address.css'
import postcodeCss from './Postcode.css'

const Postcode = ({ postcodePending, onPostcodeLookup, postcodeTemp, addresses, onSelectedAddressChange, showDropdown, receiveRef, trackClick, isMobile }) => (
  <div>
    <div>
      <div className={addressCss.flex}>
        <div className={postcodeCss.postCodeField}>
          <Field
            name="postcodeTemp"
            component={ReduxFormInput}
            inputType="Input"
            color="gray"
            label="Postcode"
            mask
            withRef
            ref={receiveRef}
          />
        </div>

        <div className={postcodeCss.findAddressButton}>
          <Button
            width="auto"
            onClick={() => { onPostcodeLookup(postcodeTemp) }}
            pending={postcodePending}
            color="secondary"
          >
            Find Address
          </Button>
        </div>
      </div>
    </div>
    {(addresses.length > 0 && showDropdown) ? <div>
      <br />
      <div className="deliveryDropdown" data-testing="checkoutAddressDropdown">
        <Field
          name="addressId"
          component={ReduxFormInput}
          options={
            addresses.map(address => ({
              value: address.id,
              label: [...address.labels].reverse().join(', '),
            }))
          }
          onChange={(event, addressId) => {
            isMobile && trackClick('DeliveryAddress Selected')
            onSelectedAddressChange(event, addressId)
          }}
          inputType="DropDown"
          label="Select your address"
          color="secondary"
          mask
          withRef
          ref={receiveRef}
        />
      </div>
                                              </div> : null}
  </div>
)

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
}

Postcode.defaultProps = {
  postcodePending: false,
  onPostcodeLookup: () => { },
  postcodeTemp: '',
  addresses: Immutable.List(),
  onSelectedAddressChange: () => { },
  showDropdown: false,
  receiveRef: () => { },
}

export default Postcode
