import PropTypes from 'prop-types'
import React from 'react'
import css from './UseWithin.css'

const UseWithin = ({ useWithin }) => {
	const useWithinFormatted = String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')

	return (
		<div>
			<span className={css.icon} /><span className={css.description}>&nbsp;Use within {useWithinFormatted} days after delivery</span>
		</div>
	)
}

UseWithin.propTypes = {
	useWithin: PropTypes.string.isRequired,
}

export default UseWithin
