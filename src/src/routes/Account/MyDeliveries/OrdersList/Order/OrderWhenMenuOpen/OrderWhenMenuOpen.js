import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderWhenMenuOpen.module.css'

const OrderWhenMenuOpen = ({ whenMenuOpen }) => (
  <p className={css.whenMenuOpen}>
    Menu open
    {' '}
    {whenMenuOpen}
  </p>
)

OrderWhenMenuOpen.propTypes = {
  whenMenuOpen: PropTypes.string,
}

OrderWhenMenuOpen.defaultProps = {
  whenMenuOpen: '',
}

export default OrderWhenMenuOpen
