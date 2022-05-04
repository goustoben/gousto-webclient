import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from 'utils/format'

import css from './Price.css'

const Price = ({ grossTotal, totalDiscount, total }) => {
  if (grossTotal === 0) {
    return (
      <div>
        £<span className={css.dash}>-</span>
      </div>
    )
  }

  const recipeDiscountExists = totalDiscount > 0

  return recipeDiscountExists ? (
    <>
      <span className={css.strikedOutPrice}>{formatPrice(grossTotal)}</span>
      <span className={css.primaryPrice}>{formatPrice(total)}</span>
    </>
  ) : (
    <span className={css.primaryPrice}>{formatPrice(grossTotal)}</span>
  )
}

Price.defaultProps = {
  grossTotal: 0,
  totalDiscount: 0,
  total: 0,
}

Price.propTypes = {
  grossTotal: PropTypes.number,
  totalDiscount: PropTypes.number,
  total: PropTypes.number,
}

export { Price }
