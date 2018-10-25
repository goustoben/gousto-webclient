import PropTypes from 'prop-types'
import React from 'react'

import css from './Surcharge.css'

const Surcharge = ({ surcharge, quantity }) => (
	(surcharge)
	? <div className={css.surcharge}>+&pound;{Number(surcharge * quantity).toFixed(2)}</div>
	: null
)

Surcharge.propTypes = {
	surcharge: PropTypes.number,
	quantity: PropTypes.number,
}

Surcharge.defaultProps = {
	quantity: 1,
}

export default Surcharge
