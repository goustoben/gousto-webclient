import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { onEnter } from 'utils/accessibility'
import { Postcode } from '../Postcode'
import { AddressInputs } from '../AddressInputs'
import { DeliveryCard } from '../../Delivery/DeliveryCard'
import css from '../Address.module.css'

export class AddressOverhaul extends PureComponent {
  handleEditAddressManually = () => {
    const { onEnterAddressManuallyClick } = this.props
    onEnterAddressManuallyClick()
  }

  renderAddressCard = () => {
    const { currentAddress } = this.props

    return (
      <DeliveryCard iconName="icon-home" dataTesting="deliveryCardAddress">
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
          <div className={css.enterAddressManually}>
            <span
              role="button"
              tabIndex="0"
              onClick={this.handleEditAddressManually}
              onKeyDown={onEnter(this.handleEditAddressManually)}
              className={css.editAddressLink}
              data-testing="checkoutEnterAddressManually"
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
