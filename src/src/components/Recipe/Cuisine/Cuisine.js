import PropTypes from 'prop-types'
import React from 'react'
import css from './Cuisine.css'

const Cuisine = ({ cuisine }) => (
	<div>
		<span className={css.icon}></span><span className={css.description}>&nbsp;{cuisine} Cuisine</span>
	</div>
)

Cuisine.propTypes = {
	cuisine: PropTypes.string.isRequired,
}

export default Cuisine
