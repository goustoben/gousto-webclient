import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'goustouicomponents'
import Loading from 'Loading'
import { addressPropType } from '../../../getHelpPropTypes'
import { Address } from './Address'
import css from './AddressSection.css'

const AddressSection = ({
  loadShippingAddresses,
  selectedAddress,
}) => {
  useEffect(() => {
    loadShippingAddresses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <p className={css.title}>Delivery Address</p>
      {selectedAddress
        ? (
          <Address
            line1={selectedAddress.line1}
            line2={selectedAddress.line2}
            line3={selectedAddress.line3}
            name={selectedAddress.name}
            postcode={selectedAddress.postcode}
            town={selectedAddress.town}
          />
        )
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
}

AddressSection.defaultProps = {
  selectedAddress: null,
}

export { AddressSection }
