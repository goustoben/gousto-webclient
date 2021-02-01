import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { onEnter } from 'utils/accessibility'
import Postcode from '../Postcode'
import AddressInputs from '../AddressInputs'
import { DeliveryCard } from '../../Delivery/DeliveryCard'
import css from '../Address.css'

export class AddressOverhaul extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isEditAddressClicked: false
    }
  }

  handleEditAddressClick = () => {
    this.setState({
      isEditAddressClicked: true
    })
  }

  handleEditAddressManually = () => {
    const { onEnterAddressManuallyClick } = this.props
    this.handleEditAddressClick()
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
              onClick={this.handleEditAddressClick}
              onKeyDown={onEnter(this.handleEditAddressClick)}
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
      notFound,
      isBillingAddress,
    } = this.props
    const { isEditAddressClicked } = this.state

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

        {!isEditAddressClicked && isAddressSelected && this.renderAddressCard()}

        {(isBillingAddress || isEditAddressClicked) && (
          <AddressInputs
            receiveRef={receiveRef}
            sectionName={sectionName}
            isCheckoutOverhaulEnabled
          />
        )}

        {!notFound && (
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
  notFound: PropTypes.bool,
  onEnterAddressManuallyClick: PropTypes.func,
  isBillingAddress: PropTypes.bool,
  currentAddress: PropTypes.string,
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
  notFound: false,
  isMobile: false,
  showDropdown: false,
  addresses: [],
  postcodeTemp: '',
  isBillingAddress: false,
  currentAddress: '',
}
