import PropTypes from 'prop-types'
import React from 'react'

import config from 'config'
import css from './AddRecipe.css'
import { AddButton } from './AddButton'
import { DropdownArrowContainer } from './DropdownArrow'

const AddRecipe = ({ id, view, position, stock, inBasket, isOnDetailScreen = false }) => {
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  if (outOfStock) {
    return null
  }

  return (
    <div className={css.addRecipeWrapper}>
      <AddButton recipeId={id} view={view} stock={stock} position={position} outOfStock={outOfStock} />
      {!isOnDetailScreen && <DropdownArrowContainer recipeId={id} />}
    </div>

  )
}

AddRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  inBasket: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
  isOnDetailScreen: PropTypes.bool
}

AddRecipe.defaultProps = {
  isOnDetailScreen: false
}

export { AddRecipe }
