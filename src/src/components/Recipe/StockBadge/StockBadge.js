import React, { PropTypes } from 'react'

import InfoBadge from '../InfoBadge'
import { getStockTag } from 'utils/recipe'

const StockBadge = ({ stock, inverse }) => {
	const stockNumber = getStockTag(stock)

	return (stockNumber)
	? <InfoBadge stockInfo inverse={inverse}>{stockNumber}</InfoBadge>
	: null
}

StockBadge.propTypes = {
	stock: PropTypes.number,
	inverse: PropTypes.bool,
}

export default StockBadge
