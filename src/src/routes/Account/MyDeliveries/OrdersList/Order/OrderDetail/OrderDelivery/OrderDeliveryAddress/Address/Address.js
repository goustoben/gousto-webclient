import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './Address.css'

const propTypes = {
  addressName: PropTypes.string,
  line1: PropTypes.string,
  line2: PropTypes.string,
  line3: PropTypes.string,
  town: PropTypes.string,
  postcode: PropTypes.string,
  isSelected: PropTypes.bool,
  addressId: PropTypes.string,
  selectAddress: PropTypes.func,
}

const defaultProps = {
  addressName: '',
  line1: '',
  line2: '',
  line3: '',
  town: '',
  postcode: '',
  isSelected: false,
}

const formatAddress = (line1, line2 , line3 , town, postcode) => {
  const address = [line1]

  if(line2) address.push(line2)
  if(line3) address.push(line3)

  address.push(town, postcode)

  return address.join(', ')
}

const Address = ({selectAddress, isSelected, addressId, addressName, line1, line2, line3, town, postcode}) => {

  return (
    <div className={css.deliveryContainer}>
      <div className={css.checkbox}>
        <div
          className={
            classnames(
              [css.square],
              { [css.cantClick]: isSelected })
          }
          onClick={() => !isSelected && selectAddress(addressId) }
        >
          {isSelected ? <div className={css.tick}></div> : null}
        </div>
      </div>
      <div className={css.addressContainer}>
        <p className={css.name}>{addressName}</p>
        <p>{formatAddress(line1, line2, line3, town, postcode)}</p>
      </div>
    </div>
  )

}

Address.propTypes = propTypes
Address.defaultProps = defaultProps

export { Address }
