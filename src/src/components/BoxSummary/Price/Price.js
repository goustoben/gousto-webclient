import PropTypes from 'prop-types'
import React from 'react'
import { formatPrice } from 'utils/format'

import css from './Price.css'

const Price = ({ recipeTotal, recipeDiscount, recipeTotalDiscounted }) => (
  recipeTotal > 0 ? (
		<div>
			<span className={recipeDiscount > 0 ? css.total : ''}>
				{formatPrice(recipeTotal)}
			</span>
			<span className={recipeDiscount > 0 ? css.discount : css.hide}>
				{formatPrice(recipeTotalDiscounted)}
			</span>
		</div>
  ) : (
		<div>£<span className={css.dash}>-</span></div>
  )
)

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

export default Price
