import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './Address.css'

const propTypes = {
  addressName: PropTypes.string,
  formattedAddress: PropTypes.string,
  isSelected: PropTypes.bool,
  addressId: PropTypes.string,
  selectAddress: PropTypes.func,
}

const defaultProps = {
  addressName: '',
  formattedAddress: '',
  isSelected: false,
}

const Address = ({selectAddress, isSelected, addressId, addressName, formattedAddress}) => (
  <label
    htmlFor={addressId}
    className={classnames(css.container, {
      [css.containerSelected]: isSelected
    })}
  >
    <div className={css.radioContainer}>
      <input
        type="radio"
        id={addressId}
        checked={isSelected}
        readOnly
        className={css.hiddenRadio}
        onClick={() => !isSelected && selectAddress(addressId)}
      />
      <div
        className={classnames(css.customRadio, {
          [css.customRadioSelected]: isSelected
        })}
      />
    </div>
    <div className={css.addressContainer}>
      <h3 className={css.addressName}>{addressName}</h3>
      <p className={css.addressDetails}>{formattedAddress}</p>
    </div>
  </label>
)

Address.propTypes = propTypes
Address.defaultProps = defaultProps

export { Address }
