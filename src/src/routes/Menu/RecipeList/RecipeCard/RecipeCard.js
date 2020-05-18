import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Recipe from 'containers/menu/Recipe'
import { getFeaturedImage } from 'utils/image'

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
  recipeId, recipe, index, showDetailRecipe, isFeatured,

  numPortions, cutoffDate, browserType,
}) => {
  if (!recipe) {
    return null
  }

  const isChefPrepared = recipe.get('chefPrepared') === true

  const view = getRecipeView(isFeatured, recipe.get('isFineDineIn'), isChefPrepared)

  return (
    <Recipe
      id={recipeId}
      position={index}
      media={getFeaturedImage(recipe, view, browserType)}
      url={recipe.get('url')}
      useWithin={recipe.get('shelfLifeDays')}
      cookingTime={numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')}
      averageRating={recipe.getIn(['rating', 'average'])}
      ratingCount={recipe.getIn(['rating', 'count'])}
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
    />
  )
}

RecipeCard.defaultProps = {
  isFeatured: false,
  cutoffDate: ''
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isFeatured: PropTypes.bool,
  cutoffDate: PropTypes.string,
  browserType: PropTypes.string.isRequired,
}

export { RecipeCard }
