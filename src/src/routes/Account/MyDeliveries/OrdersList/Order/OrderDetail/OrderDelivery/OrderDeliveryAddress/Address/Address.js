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

const Address = ({selectAddress, isSelected, addressId, addressName, line1, line2, line3, town, postcode}) => (
  <label
    htmlFor={addressId}
    className={classnames(css.container, {
      [css.containerSelected]: isSelected
    })}
    tabIndex="0"
  >
    <div className={css.radioContainer}>
      <input
        type="radio"
        id={addressId}
        checked={isSelected}
        className={css.hiddenRadio}
        onClick={() => !isSelected && selectAddress(addressId)}
        tabIndex="-1"
      />
      <div
        className={classnames(css.customRadio, {
          [css.customRadioSelected]: isSelected
        })}
      />
    </div>
    <div className={css.addressContainer}>
      <h3 className={css.addressName}>{addressName}</h3>
      <p className={css.addressDetails}>{formatAddress(line1, line2, line3, town, postcode)}</p>
    </div>
  </label>
)

Address.propTypes = propTypes
Address.defaultProps = defaultProps

export { Address }
