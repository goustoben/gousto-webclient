import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getFeaturedImage } from 'utils/image'
import { Recipe } from '../../Recipe'

const getRecipeView = (isFeatured, isFineDineIn, isChefPrepared) => {
  if (isChefPrepared) {
    return 'chefPrepared'
  }

  if (typeof (window) !== 'undefined' && window.innerWidth < 1025) {
    return 'grid'
  }

  if (isFeatured) {
    return 'featured'
  }

  if (isFineDineIn) {
    return 'fineDineIn'
  }

  return 'grid'
}

const RecipeCard = ({
  originalId, recipeId, recipe, index, showDetailRecipe, isFeatured,
  numPortions, cutoffDate, browserType, stock, inBasket
}) => {
  if (!recipe) {
    return null
  }

  const isChefPrepared = recipe.get('chefPrepared') === true

  const view = getRecipeView(isFeatured, recipe.get('isFineDineIn'), isChefPrepared)

  return (
    <Recipe
      id={recipeId}
      originalId={originalId}
      position={index}
      media={getFeaturedImage(recipe, view, browserType)}
      url={recipe.get('url')}
      useWithin={recipe.get('shelfLifeDays')}
      cookingTime={numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')}
      chef={recipe.get('chef')}
      description={recipe.get('description')}
      availability={recipe.get('availability')}
      equipment={recipe.get('equipment')}
      fiveADay={recipe.get('fiveADay')}
      diet={recipe.get('dietType')}
      view={view}
      cutoffDate={cutoffDate}
      onClick={(isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }}
      numPortions={numPortions}
      stock={stock}
      inBasket={inBasket}
    />
  )
}

RecipeCard.defaultProps = {
  isFeatured: false,
  cutoffDate: ''
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  originalId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isFeatured: PropTypes.bool,
  cutoffDate: PropTypes.string,
  browserType: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  inBasket: PropTypes.bool.isRequired
}

export { RecipeCard }
