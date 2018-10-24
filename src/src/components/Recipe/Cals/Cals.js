import PropTypes from 'prop-types'
import React from 'react'
import css from './Cals.css'

const Cals = ({ cals }) => (
	<div>
		<span className={css.icon} /><span className={css.description}>&nbsp;{Math.round(cals)} cals / serving&#42;</span>
	</div>
)

Cals.propTypes = {
	cals: PropTypes.number.isRequired,
}

export default Cals
