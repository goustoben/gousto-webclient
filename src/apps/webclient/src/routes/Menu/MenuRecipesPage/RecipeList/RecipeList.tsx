import React, { memo, useEffect } from 'react'

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
        <RecipeListItemMemoised
          key={value.reference}
          recipe={value.recipe}
          reference={value.reference}
          originalId={value.originalId}
          index={index}
          currentCollectionId={currentCollectionId}
          isDietaryCollectionLinksEnabled={isDietaryCollectionLinksEnabled}
        />
      ))}
      <CTAToAllRecipes />
    </div>
  )
}

const RecipeListItem = ({
  recipe,
  reference,
  originalId,
  index,
  currentCollectionId,
  isDietaryCollectionLinksEnabled,
}: {
  recipe: RecipeOptionPair['recipe']
  reference: RecipeOptionPair['reference']
  originalId: RecipeOptionPair['originalId']
  index: number
  currentCollectionId: string
  isDietaryCollectionLinksEnabled: boolean
}) => (
  <React.Fragment>
    {isDietaryCollectionLinksEnabled &&
      showDietaryCollectionLinks({ collectionId: currentCollectionId, atIndex: index }) && (
        <CollectionLink />
      )}

    <RecipeTileBridge
      recipeReference={reference}
      recipe={recipe}
      originalId={originalId}
      collectionId={currentCollectionId}
    />
  </React.Fragment>
)

RecipeListItem.whyDidYouRender = true

const RecipeListItemMemoised = memo(RecipeListItem)

RecipeList.whyDidYouRender = true
