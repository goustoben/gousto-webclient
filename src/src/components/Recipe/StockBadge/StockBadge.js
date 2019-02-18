import PropTypes from 'prop-types'
import React from 'react'

import { getStockTag } from 'utils/recipe'
import InfoBadge from '../InfoBadge'

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
