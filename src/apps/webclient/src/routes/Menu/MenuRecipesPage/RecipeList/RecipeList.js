import React, { useEffect } from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { CollectionLink } from '../../components/CollectionLink'
import { RecipeTile } from '../../components/RecipeTile'
import { RecipeContextProvider } from '../../context/recipeContext'
import { RecipeReferenceProvider } from '../../context/recipeReferenceContext'
import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { showDietaryCollectionLinks } from './showDietaryCollectionLinks'
import { useTracking } from './useTracking'

import css from './RecipeList.css'

import { Title } from '@features/recipe-tile'

export const buildTracker =
  ({ recipes, currentCollectionId, track }) =>
  () => {
    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))
    track(currentCollectionId, recipeIds.toJS())
  }

export const RecipeList = ({
  recipes,
  currentCollectionId,
  isDietaryCollectionLinksEnabled,
  showDetailRecipe,
}) => {
  const track = useTracking()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  return (
    <div className={css.emeRecipeList}>
      {recipes.map((value, index) => (
        <React.Fragment key={value.reference}>
          {isDietaryCollectionLinksEnabled &&
            showDietaryCollectionLinks({ collectionId: currentCollectionId, atIndex: index }) && (
              <CollectionLink />
            )}
          <Title />
          <RecipeReferenceProvider value={value.reference}>
            <RecipeContextProvider value={value.recipe}>
              <RecipeTile
                recipeId={value.recipe.get('id')}
                originalId={value.originalId}
                currentCollectionId={currentCollectionId}
                onClick={showDetailRecipe}
              />
            </RecipeContextProvider>
          </RecipeReferenceProvider>
        </React.Fragment>
      ))}
      <CTAToAllRecipes />
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  isDietaryCollectionLinksEnabled: PropTypes.bool,
  showDetailRecipe: PropTypes.func.isRequired,
}

RecipeList.defaultProps = {
  isDietaryCollectionLinksEnabled: false,
}
