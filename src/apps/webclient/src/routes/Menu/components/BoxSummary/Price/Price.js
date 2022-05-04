import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from 'utils/format'

import css from './Price.css'

const Price = ({ recipeTotal, recipeDiscount, recipeTotalDiscounted }) => {
  if (recipeTotal === 0) {
    return (
      <div>
        £<span className={css.dash}>-</span>
      </div>
    )
  }

  const recipeDiscountExists = recipeDiscount > 0

  return recipeDiscountExists ? (
    <>
      <span className={css.strikedOutPrice}>{formatPrice(recipeTotal)}</span>
      <span className={css.primaryPrice}>{formatPrice(recipeTotalDiscounted)}</span>
    </>
  ) : (
    <span className={css.primaryPrice}>{formatPrice(recipeTotal)}</span>
  )
}

Price.defaultProps = {
  recipeTotal: 0,
  recipeDiscount: 0,
  recipeTotalDiscounted: 0,
}

Price.propTypes = {
  recipeTotal: PropTypes.number,
  recipeDiscount: PropTypes.number,
  recipeTotalDiscounted: PropTypes.number,
}

export { Price }
