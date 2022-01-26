import React, { useEffect, useState } from 'react'
import actual from 'actual'
import PropTypes from 'prop-types'
import { Card, Modal, ModalHeader } from 'goustouicomponents'
import Loading from 'Loading'

import { addressPropType } from '../../../getHelpPropTypes'
import { Address } from './Address'
import css from './AddressSection.css'
import { AddressesListContainer } from './AddressesList'

const AddressSection = ({
  loadShippingAddresses,
  selectedAddress,
  showChangeButton
}) => {
  const [isChangeClicked, setChangeClicked] = useState(false)
  const toggleModal = () => {
    setChangeClicked(false)
  }
  useEffect(() => {
    loadShippingAddresses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getAddressSectionContent = () => {
    if (isChangeClicked) {
      return (actual('width', 'px') < 640)
        ? (
          <Modal
            name="recipeCardAddresses"
            description="Mobile modal to display change address for ordering recipe card"
            isOpen={isChangeClicked}
            handleClose={toggleModal}
            animated={false}
            variant="bottomSheet"
            withOverlay
          >
            <ModalHeader withSeparator align="left">Change delivery address</ModalHeader>
            <div className={css.mobileAddressesList}>
              <AddressesListContainer inputVariant="tile" />
            </div>
          </Modal>
        )
        : <AddressesListContainer inputVariant="default" />
    }

    return (
      <Address
        line1={selectedAddress.line1}
        line2={selectedAddress.line2}
        line3={selectedAddress.line3}
        name={selectedAddress.name}
        postcode={selectedAddress.postcode}
        town={selectedAddress.town}
      />
    )
  }

  return (
    <Card>
      <div className={css.addressSubTitle}>
        <p className={css.title}>Delivery Address</p>
        {(showChangeButton && !isChangeClicked)
          && (
            <button
              className={css.changeAddress}
              type="button"
              onClick={() => setChangeClicked(true)}
              data-testing="changeAddressButton"
            >
              Change
            </button>
          )}
      </div>
      {selectedAddress.name
        ? (getAddressSectionContent())
        : (
          <div className={css.loadingWrapper}>
            <Loading />
          </div>
        )}
    </Card>
  )
}

AddressSection.propTypes = {
  loadShippingAddresses: PropTypes.func.isRequired,
  selectedAddress: addressPropType,
  showChangeButton: PropTypes.bool
}

AddressSection.defaultProps = {
  selectedAddress: null,
  showChangeButton: false
}

export { AddressSection }
