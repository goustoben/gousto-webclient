import PropTypes from 'prop-types'
import React from 'react'
import css from './Label.css'

const Label = ({ children, label, subLabel }) => (
	<label className={css.labelContainer}>
		<p className={css.label}>{label}</p>
		{subLabel && <p className={css.subLabel}>{subLabel}</p>}
		{children}
	</label>
)

Label.propTypes = {
	children: PropTypes.node,
	label: PropTypes.node,
	subLabel: PropTypes.node,
}

export default Label
