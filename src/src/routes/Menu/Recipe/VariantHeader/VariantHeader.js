import React from 'react'
import Immutable from 'immutable'
import config from 'config'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, inBasket, stock }) => {
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  if (!recipeVariants || recipeVariants.length === 0 || outOfStock) {
    return null
  }

  return (
    <div className={css.variantHeader}>
      {recipeVariants.length + 1}
      {' '}
      options available
    </div>
  )
}

VariantHeader.propTypes = {
  recipeVariants: PropTypes.instanceOf(Immutable.List),
  inBasket: PropTypes.bool,
  stock: PropTypes.number
}

VariantHeader.defaultProps = {
  recipeVariants: Immutable.List([]),
  inBasket: false,
  stock: null
}
export { VariantHeader }
