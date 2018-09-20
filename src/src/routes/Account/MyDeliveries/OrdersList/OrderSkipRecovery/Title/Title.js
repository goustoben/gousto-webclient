import React, { PropTypes } from 'react'

import { ModalTitle } from 'ModalComponent'

import css from './Title.css'

const propTypes = {
	title: PropTypes.string.isRequired,
	orderType: PropTypes.string.isRequired,
}

const defaultProps = {
	title: '',
	orderType: '',
}

const Title = ({ title, orderType }) => {
	const titleCopy = title || `Are you sure you want to ${(orderType === 'pending') ? 'cancel' : 'skip'}?`

	return (
		<ModalTitle>
			<div className={css.title}>
				{titleCopy}
			</div>
		</ModalTitle>
	)
}

Title.propTypes = propTypes

Title.defaultProps = defaultProps

export default Title
