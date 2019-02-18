import PropTypes from 'prop-types'
import React from 'react'

import css from './DiscountBadge.css'

const DiscountBadge = ({ flatDiscountAmount, percentageDiscountAmount }) => (
	<div className={css.discountBadge}>
		<div className={css.discountCopy}>
			<div>{percentageDiscountAmount ? `${percentageDiscountAmount}%` : `£${flatDiscountAmount}`}</div>
			<div>OFF</div>
		</div>
	</div>
)

DiscountBadge.propTypes = {
  flatDiscountAmount: PropTypes.number,
  percentageDiscountAmount: PropTypes.number,
}

DiscountBadge.defaultProps = {
  flatDiscountAmount: null,
  percentageDiscountAmount: null,
}

export default DiscountBadge
