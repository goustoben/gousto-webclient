import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { ScrollCarousel } from '../ScrollCarousel'
import { LoadingRecipeCards } from './LoadingRecipeCards'
import { RecipeCards } from './RecipeCards'
import { getScrollStepInPixels } from './recipesUtils'
import css from './Recipes.module.css'

export const Recipes = ({
  currentCollectionId,
  recipes,
  openRecipeDetails,
  trackScrollOneStep,
}) => {
  const isLoading = !recipes || recipes.size === 0

  return (
    <ScrollCarousel stepSizePx={getScrollStepInPixels(css)} trackScrollOneStep={trackScrollOneStep}>
      <div className={css.recipesContainer}>
        {isLoading ? (
          <LoadingRecipeCards />
        ) : (
          <RecipeCards
            openRecipeDetails={openRecipeDetails}
            recipes={recipes}
            currentCollectionId={currentCollectionId}
          />
        )}
      </div>
    </ScrollCarousel>
  )
}

Recipes.propTypes = {
  currentCollectionId: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List),
  openRecipeDetails: PropTypes.func.isRequired,
  trackScrollOneStep: PropTypes.func.isRequired,
}

Recipes.defaultProps = {
  currentCollectionId: null,
  recipes: null,
}
