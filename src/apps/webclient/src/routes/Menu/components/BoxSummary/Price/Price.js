import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from 'utils/format'
import { getIsSimplifyBasketBarEnabled } from 'selectors/features'

import css from './Price.css'

const Price = ({ recipeTotal, recipeDiscount, recipeTotalDiscounted }) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  if (recipeTotal === 0) {
    return (
      <div>
        £<span className={css.dash}>-</span>
      </div>
    )
  }

  if (isSimplifyBasketBarEnabled) {
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

  return (
    <React.Fragment>
      <span className={recipeDiscount > 0 ? css.total : ''}>{formatPrice(recipeTotal)}</span>
      <span className={recipeDiscount > 0 ? css.discount : css.hide}>
        {formatPrice(recipeTotalDiscounted)}
      </span>
    </React.Fragment>
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
