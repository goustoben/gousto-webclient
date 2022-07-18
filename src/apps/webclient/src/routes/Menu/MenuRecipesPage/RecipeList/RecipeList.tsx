import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react'

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

/**
 * How many recipes to render immediately
 */
const IMMEDIATE_RENDER_COUNT = 40
/**
 * How long to wait before loading the rest
 */
const RENDER_REMAINING_TIME_MS = 1000

export const RecipeList = ({
  recipes,
  currentCollectionId,
  isDietaryCollectionLinksEnabled = false,
}: RecipeListProps) => {
  const track = useTracking()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  const [recipesToRender, setRecipesToRender] = React.useState<RecipeOptionPair[]>([])

  // Indicate that initial staged rendering already completed
  // and when there are re-renderings, it should be done for all recipes.
  // React would take care of diffing recipes individually
  const hasCompletedRendering = recipesToRender.length === recipes.length

  useLayoutEffect(() => {
    if (recipes.length <= IMMEDIATE_RENDER_COUNT || hasCompletedRendering) {
      setRecipesToRender(recipes)

      return
    }

    setRecipesToRender(recipes.slice(0, IMMEDIATE_RENDER_COUNT))

    const renderRest = setTimeout(() => {
      setRecipesToRender(recipes)
    }, RENDER_REMAINING_TIME_MS)

    return () => {
      clearTimeout(renderRest)
    }
  }, [recipes, hasCompletedRendering])

  const renderRecipe = useCallback(
    (value: RecipeOptionPair, index: number) => (
      <RecipeListItemMemoised
        key={value.reference}
        recipe={value.recipe}
        reference={value.reference}
        originalId={value.originalId}
        index={index}
        currentCollectionId={currentCollectionId}
        isDietaryCollectionLinksEnabled={isDietaryCollectionLinksEnabled}
      />
    ),
    [currentCollectionId, isDietaryCollectionLinksEnabled],
  )

  return (
    <div className={css.emeRecipeList}>
      {recipesToRender.map(renderRecipe)}
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

const RecipeListItemMemoised = memo(RecipeListItem) as any
