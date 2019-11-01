import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Recipe from 'containers/menu/Recipe'
import { getFeaturedImage } from 'utils/image'
import { formatRecipeTitle, getFoodBrand } from 'utils/recipe'
import { isRecommendedRecipe } from 'utils/menu'

const getRecipeView = (mobileGridView, isFeatured, isFineDineIn) => {
  if (typeof (window) !== 'undefined' && window.innerWidth < 1025) {
    return 'grid'
  }

  if (mobileGridView) {
    return 'gridSmall'
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
  recipe, index, mobileGridView, showDetailRecipe, isFeatured,

  numPortions, cutoffDate, features, allRecipesList, recipesStore, browserType
}) => {
  if (!recipe) {
    return null
  }

  const recipeId = recipe.get('id')
  const range = getFoodBrand(recipe)
  const isFineDineIn = range.get('slug') === 'fine-dine-in'

  const showShortlistFirstStep = index === 0

  const view = getRecipeView(mobileGridView, isFeatured, isFineDineIn)

  return (
    <Recipe
      id={recipeId}
      position={index}
      title={formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))}
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
      view={view}
      cutoffDate={cutoffDate}
      onClick={(isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }}
      features={features}
      isRecommendedRecipe={isRecommendedRecipe(recipeId, allRecipesList, recipesStore)}
      range={range}
      tasteScore={recipe.getIn(['recommendationData', 'score'])}
      fiveADay={recipe.get('fiveADay')}
      diet={recipe.get('dietType')}
      showShortlistFirstStep={showShortlistFirstStep}
    />
  )
}

RecipeCard.defaultProps = {
  isFeatured: false,
  cutoffDate: ''
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  index: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  mobileGridView: PropTypes.bool.isRequired,
  features: PropTypes.instanceOf(Immutable.Map).isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  allRecipesList: PropTypes.instanceOf(Immutable.List).isRequired,
  isFeatured: PropTypes.bool,
  cutoffDate: PropTypes.string,
  browserType: PropTypes.string.isRequired
}

export { RecipeCard }
