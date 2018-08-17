import React from 'react'
import css from './Diet.css'

const Diet = ({ diet }) => (
	<div>
		<span className={css.icon}></span><span className={css.description}>&nbsp;{(diet === 'vegan') ? 'plant-based' : diet}</span>
	</div>
)

Diet.propTypes = {
	diet: React.PropTypes.string.isRequired,
}

export default Diet
