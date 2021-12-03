import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { RecipeCard } from 'goustouicomponents'
import { getMediaForRecipeCard } from './recipesUtils'
import css from './Recipes.module.css'

export const RecipeCards = ({ openRecipeDetails, recipes, currentCollectionId }) => {
  const handleRecipeClick = (event, recipe) => {
    event.preventDefault()

    const recipeId = recipe.get('id')
    const title = recipe.get('title')
    openRecipeDetails(recipeId, currentCollectionId, title)
  }

  return (
    <React.Fragment>
      {recipes.map(({ recipe }) => (
        <button
          type="button"
          key={recipe.get('id')}
          onClick={(event) => handleRecipeClick(event, recipe)}
          className={css.recipeCardWrapper}
        >
          <RecipeCard
            title={recipe.get('title')}
            media={getMediaForRecipeCard(recipe)}
            rating={{
              amountOfReviews: recipe.getIn(['rating', 'count']),
              average: recipe.getIn(['rating', 'average']),
              size: 'Medium',
            }}
            cookingTime={recipe.get('cookingTime')}
            hasHoverEffect
            fitHeight
            hasMargin={false}
            isResizable
          />
        </button>
      ))}
    </React.Fragment>
  )
}

RecipeCards.propTypes = {
  currentCollectionId: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List),
  openRecipeDetails: PropTypes.func.isRequired,
}

RecipeCards.defaultProps = {
  currentCollectionId: null,
  recipes: null,
}
