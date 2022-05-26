import React, { Fragment, PureComponent } from 'react'

import { Text, Link, Space, Box, FlexDirection } from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'

import { onEnter } from 'utils/accessibility'

import { DeliveryCard } from '../../Delivery/DeliveryCard'
import { AddressInputs } from '../AddressInputs'
import { Postcode } from '../Postcode'

export class AddressOverhaul extends PureComponent {
  handleEditAddressManually = () => {
    const { onEnterAddressManuallyClick } = this.props
    onEnterAddressManuallyClick()
  }

  renderAddressCard = () => {
    const { currentAddress } = this.props

    return (
      <DeliveryCard iconName="icon-home" dataTesting="deliveryCardAddress">
        <Box display="flex" flexDirection={FlexDirection.Column}>
          <Text>{currentAddress}</Text>
          <Space size={2} />
          <Box>
            {/* eslint-disable-next-line */}
            <Link
              role="button"
              tabIndex="0"
              size={1}
              onClick={this.handleEditAddressManually}
              onKeyDown={onEnter(this.handleEditAddressManually)}
            >
              Edit address
            </Link>
          </Box>
        </Box>
      </DeliveryCard>
    )
  }

  render() {
    const {
      onPostcodeLookup,
      postcodeTemp,
      addresses,
      onSelectedAddressChange,
      receiveRef,
      isMobile,
      isAddressSelected,
      sectionName,
      isEditingManually,
    } = this.props

    return (
      <Fragment>
        <Postcode
          onPostcodeLookup={onPostcodeLookup}
          postcodeTemp={postcodeTemp}
          addresses={addresses}
          onSelectedAddressChange={onSelectedAddressChange}
          receiveRef={receiveRef}
          isMobile={isMobile}
          isAddressSelected={isAddressSelected}
        />

        {!isEditingManually && isAddressSelected && this.renderAddressCard()}

        {isEditingManually && <AddressInputs receiveRef={receiveRef} sectionName={sectionName} />}

        {!(isEditingManually || isAddressSelected) && (
          <>
            <Box>
              {/* eslint-disable-next-line */}
              <Link
                data-testing="checkoutEnterAddressManually"
                role="button"
                tabIndex="0"
                size={1}
                onClick={this.handleEditAddressManually}
                onKeyDown={onEnter(this.handleEditAddressManually)}
              >
                Enter address manually
              </Link>
            </Box>
            <Space size={[4, 6]} />
          </>
        )}
      </Fragment>
    )
  }
}

AddressOverhaul.propTypes = {
  sectionName: PropTypes.string,
  formErrors: PropTypes.shape({}),
  formValues: PropTypes.shape({}),
  receiveRef: PropTypes.func,
  isMobile: PropTypes.bool,
  onPostcodeLookup: PropTypes.func,
  postcodeTemp: PropTypes.string,
  addresses: PropTypes.arrayOf(PropTypes.object),
  onSelectedAddressChange: PropTypes.func,
  isAddressSelected: PropTypes.bool,
  onEnterAddressManuallyClick: PropTypes.func,
  currentAddress: PropTypes.string,
  isEditingManually: PropTypes.bool.isRequired,
}

AddressOverhaul.defaultProps = {
  sectionName: 'delivery',
  formErrors: {},
  formValues: {},
  receiveRef: () => {},
  onPostcodeLookup: () => {},
  onSelectedAddressChange: () => {},
  onEnterAddressManuallyClick: () => {},
  isAddressSelected: false,
  isMobile: false,
  addresses: [],
  postcodeTemp: '',
  currentAddress: '',
}
