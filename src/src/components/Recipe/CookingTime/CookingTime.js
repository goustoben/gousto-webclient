import PropTypes from 'prop-types'
import React from 'react'
import css from './CookingTime.css'
import { getCookingTime } from 'utils/recipe'

const CookingTime = ({ time }) => (
	<div>
		<span className={css.icon}></span><span className={css.description}>&nbsp;Takes {getCookingTime(time)}</span>
	</div>
)


CookingTime.propTypes = {
	time: PropTypes.number.isRequired,
}

CookingTime.defaultProps = {
	time: 0,
}

export default CookingTime
