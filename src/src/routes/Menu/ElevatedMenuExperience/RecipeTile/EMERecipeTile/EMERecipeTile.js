import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { TileImageContainer } from '../TileImage'
import css from './EMERecipeTile.css'

const EMERecipeTile = ({ recipe, recipeId, showDetailRecipe, isOutOfStock, title }) => {
  if (!recipe) {
    return null
  }

  const onClick = (isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }

  return (
    <div
      className={css.recipeTileContainer}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipe'}
    >
      <TileImageContainer
        recipeId={recipeId}
        onClick={onClick}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
        className={css.titleWrapper}
      >
        <h2 className={css.recipeTitle}>
          {title}
        </h2>
      </div>
    </div>
  )
}

EMERecipeTile.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export { EMERecipeTile }
