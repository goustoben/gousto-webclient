import React, { useEffect } from 'react'

import { RecipeOptionPair } from '@library/api-menu-service'

import { CollectionLink } from 'routes/Menu/components/CollectionLink'
import { RecipeTileBridge } from 'routes/Menu/components/RecipeTile/RecipeTileBridge'

import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { showDietaryCollectionLinks } from './showDietaryCollectionLinks'
import { useTracking } from './useTracking'

import css from './RecipeList.css'

export const buildTracker =
  ({
    recipes,
    currentCollectionId,
    track,
  }: {
    recipes: RecipeOptionPair[]
    currentCollectionId: string
    track: ReturnType<typeof useTracking>
  }) =>
  () => {
    const recipeIds = recipes.map(({ recipe }) => recipe.id)
    track(currentCollectionId, recipeIds)
  }

type RecipeListProps = {
  recipes: RecipeOptionPair[]
  currentCollectionId: string
  isDietaryCollectionLinksEnabled?: boolean
}

export const RecipeList = ({
  recipes,
  currentCollectionId,
  isDietaryCollectionLinksEnabled = false,
}: RecipeListProps) => {
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
