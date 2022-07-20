import React, { useEffect } from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { CollectionLink } from 'routes/Menu/components/CollectionLink'
import { RecipeTileBridge } from 'routes/Menu/components/RecipeTile/RecipeTileBridge'

import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { showDietaryCollectionLinks } from './showDietaryCollectionLinks'
import { useTracking } from './useTracking'

import css from './RecipeList.css'

export const buildTracker =
  ({ recipes, currentCollectionId, track }) =>
  () => {
    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))
    track(currentCollectionId, recipeIds.toJS())
  }

export const RecipeList = ({ recipes, currentCollectionId, isDietaryCollectionLinksEnabled }) => {
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
  isDietaryCollectionLinksEnabled: PropTypes.bool,
}

RecipeList.defaultProps = {
  isDietaryCollectionLinksEnabled: false,
}
