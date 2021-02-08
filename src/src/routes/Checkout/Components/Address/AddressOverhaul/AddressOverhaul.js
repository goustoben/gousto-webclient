import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { onEnter } from 'utils/accessibility'
import Postcode from '../Postcode'
import AddressInputs from '../AddressInputs'
import { DeliveryCard } from '../../Delivery/DeliveryCard'
import css from '../Address.css'

export class AddressOverhaul extends PureComponent {
  handleEditAddressManually = () => {
    const { onEnterAddressManuallyClick } = this.props
    onEnterAddressManuallyClick()
  }

  renderAddressCard = () => {
    const { currentAddress } = this.props

    return (
      <DeliveryCard iconName="icon-home">
        <div className={css.addressContainer}>
          <p className={css.deliveryAddress}>{currentAddress}</p>
          <div>
            <span
              className={css.editAddressLink}
              role="button"
              tabIndex="0"
              onClick={this.handleEditAddressManually}
              onKeyDown={onEnter(this.handleEditAddressManually)}
            >
              Edit address
            </span>
          </div>
        </div>
      </DeliveryCard>
    )
  }

  render() {
    const {
      addressesPending,
      onPostcodeLookup,
      postcodeTemp,
      addresses,
      onSelectedAddressChange,
      showDropdown,
      receiveRef,
      isMobile,
      isAddressSelected,
      sectionName,
      isEditingManually,
    } = this.props

    return (
      <Fragment>
        <Postcode
          postcodePending={addressesPending}
          onPostcodeLookup={onPostcodeLookup}
          postcodeTemp={postcodeTemp}
          addresses={addresses}
          onSelectedAddressChange={onSelectedAddressChange}
          showDropdown={showDropdown}
          receiveRef={receiveRef}
          isMobile={isMobile}
          isCheckoutOverhaulEnabled
          isAddressSelected={isAddressSelected}
        />

        {!isEditingManually && isAddressSelected && this.renderAddressCard()}

        {isEditingManually && (
          <AddressInputs
            receiveRef={receiveRef}
            sectionName={sectionName}
            isCheckoutOverhaulEnabled
          />
        )}

        {(!(isEditingManually || isAddressSelected)) && (
          <div className={css.enterAddressManually}>
            <span
              role="button"
              tabIndex="0"
              onClick={this.handleEditAddressManually}
              onKeyDown={onEnter(this.handleEditAddressManually)}
              className={css.editAddressLink}
            >
              Enter address manually
            </span>
          </div>
        )}
      </Fragment>
    )
  }
}

AddressOverhaul.propTypes = {
  sectionName: PropTypes.string,
  formErrors: PropTypes.shape({}),
  formValues: PropTypes.shape({}),
  addressesPending: PropTypes.bool,
  receiveRef: PropTypes.func,
  isMobile: PropTypes.bool,
  onPostcodeLookup: PropTypes.func,
  postcodeTemp: PropTypes.string,
  addresses: PropTypes.arrayOf(PropTypes.object),
  onSelectedAddressChange: PropTypes.func,
  showDropdown: PropTypes.bool,
  isAddressSelected: PropTypes.bool,
  onEnterAddressManuallyClick: PropTypes.func,
  currentAddress: PropTypes.string,
  isEditingManually: PropTypes.bool.isRequired,
}

AddressOverhaul.defaultProps = {
  sectionName: 'delivery',
  formErrors: {},
  formValues: {},
  addressesPending: false,
  receiveRef: () => {},
  onPostcodeLookup: () => {},
  onSelectedAddressChange: () => {},
  onEnterAddressManuallyClick: () => {},
  isAddressSelected: false,
  isMobile: false,
  showDropdown: false,
  addresses: [],
  postcodeTemp: '',
  currentAddress: '',
}
