import PropTypes from 'prop-types'
import React from 'react'
import css from './CloseButton.css'

const CloseButton = ({ onClose }) => (
	<span className={css.closeIcon} onClick={onClose}></span>
)

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default CloseButton
