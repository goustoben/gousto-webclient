import React, { PropTypes } from 'react'
import css from './OrderWhenMenuOpen.css'

const OrderWhenMenuOpen = ({ whenMenuOpen }) => (
	<p className={css.whenMenuOpen}>Menu open {whenMenuOpen}</p>
)

OrderWhenMenuOpen.propTypes = {
  whenMenuOpen: PropTypes.string,
}

OrderWhenMenuOpen.defaultProps = {
  whenMenuOpen: '',
}

export default OrderWhenMenuOpen
