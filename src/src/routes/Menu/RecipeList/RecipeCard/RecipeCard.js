import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Recipe from 'containers/menu/Recipe'
import { getFeaturedImage } from 'utils/image'
import { formatRecipeTitle, getFoodBrand } from 'utils/recipe'
import { isRecommendedRecipe } from 'utils/menu'

const getRecipeView = (mobileGridView, isFeatured = false, isFineDineIn = false) => {
  let view = 'grid'

  if (typeof (window) !== 'undefined' && window.innerWidth < 1025) {
    view = 'grid'
  } else if (mobileGridView) {
    view = 'gridSmall'
  } else if (isFeatured) {
    view = 'featured'
  } else if (isFineDineIn) {
    view = 'fineDineIn'
  }

  return view
}

const RecipeCard = ({
  recipe, index, mobileGridView, showDetailRecipe,
  
  numPortions, cutoffDate, features, allRecipesList, recipesStore
}) => {
  const recipeId = recipe.get('id')
  const range = getFoodBrand(recipe)
  const isFineDineIn = range.get('slug') === 'fine-dine-in'

  const isFeatured = index === 0
  const showShortlistFirstStep = index === 0

  const view = getRecipeView(mobileGridView, isFeatured, isFineDineIn)
  
  return (
    <Recipe
      id={recipeId}
      position={index}
      title={formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))}
      media={getFeaturedImage(recipe, view)}
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

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  index: PropTypes.number,
  mobileGridView: PropTypes.bool,
  numPortions: PropTypes.number.isRequired,
  cutoffDate: PropTypes.string,
  features: PropTypes.instanceOf(Immutable.Map),
  showDetailRecipe: PropTypes.func,
  allRecipesList: PropTypes.instanceOf(Immutable.List),
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export { RecipeCard }
