import React, { useEffect } from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { RecipeTileBridge } from 'routes/Menu/components/RecipeTile/RecipeTileBridge'

import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { useTracking } from './useTracking'

import css from './RecipeList.css'

export const buildTracker =
  ({ recipes, currentCollectionId, track }) =>
  () => {
    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))
    track(currentCollectionId, recipeIds.toJS())
  }

export const RecipeList = ({ recipes, currentCollectionId }) => {
  const track = useTracking()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  return (
    <div className={css.emeRecipeList}>
      {recipes.map((value) => (
        <React.Fragment key={value.reference}>
          <RecipeTileBridge
            recipeReference={value.reference}
            recipe={value.recipe}
            originalId={value.originalId}
            collectionId={currentCollectionId}
          />
        </React.Fragment>
      ))}
      <CTAToAllRecipes />
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
}
