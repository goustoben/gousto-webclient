import React from 'react'

import PropTypes from 'prop-types'

import { useRecipeField } from '../../../context/recipeContext'
import { useStock } from '../../../domains/stock'
import { RecipeDetailsButtons } from '../RecipeDetailsButtons'

import css from './DetailAddRecipe.css'

const DetailAddRecipe = ({ id, view, position }) => {
  const { isRecipeInStock } = useStock()
  const isOutOfStock = !isRecipeInStock(id)
  const isChefPrepared = useRecipeField('chefPrepared', false)
  const buttonText = isChefPrepared ? 'Add meal' : 'Add recipe'

  if (isOutOfStock) {
    return null
  }

  return (
    <div className={css.addRecipeWrapper}>
      <RecipeDetailsButtons
        position={position}
        recipeId={id}
        view={view}
        isOutOfStock={isOutOfStock}
        buttonText={buttonText}
      />
    </div>
  )
}

DetailAddRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  view: PropTypes.oneOf([
    'grid',
    'list',
    'featured',
    'simple',
    'chefPrepared',
    'fineDineIn',
    'fineDineInDetail',
    'detail',
    'smallGrid',
  ]).isRequired,
}

export { DetailAddRecipe }
