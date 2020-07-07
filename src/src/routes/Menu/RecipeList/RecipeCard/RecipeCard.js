import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getFeaturedImage } from 'utils/image'
import { Recipe } from '../../Recipe'

const getRecipeView = (isFineDineIn, isChefPrepared) => {
  if (isChefPrepared) {
    return 'chefPrepared'
  }

  if (isFineDineIn) {
    return 'fineDineIn'
  }

  return 'grid'
}

const RecipeCard = ({
  originalId, recipeId, recipe, index, showDetailRecipe,
  numPortions, cutoffDate, browserType, isOutOfStock, inBasket
}) => {
  if (!recipe) {
    return null
  }

  const isChefPrepared = recipe.get('chefPrepared') === true

  const view = getRecipeView(recipe.get('isFineDineIn'), isChefPrepared)

  return (
    <Recipe
      id={recipeId}
      originalId={originalId}
      position={index}
      media={getFeaturedImage(recipe, view, browserType)}
      url={recipe.get('url')}
      useWithin={recipe.get('shelfLifeDays')}
      cookingTime={numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')}
      roundelImage={recipe.get('roundelImage')}
      description={recipe.get('description')}
      availability={recipe.get('availability')}
      equipment={recipe.get('equipment')}
      fiveADay={recipe.get('fiveADay')}
      diet={recipe.get('dietType')}
      view={view}
      cutoffDate={cutoffDate}
      onClick={(isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }}
      numPortions={numPortions}
      isOutOfStock={isOutOfStock}
      inBasket={inBasket}
    />
  )
}

RecipeCard.defaultProps = {
  cutoffDate: ''
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  originalId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  cutoffDate: PropTypes.string,
  browserType: PropTypes.string.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  inBasket: PropTypes.bool.isRequired
}

export { RecipeCard }
