import React, { useCallback, useEffect } from 'react'

import { RecipeOptionPair } from '@library/api-menu-service'

import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { RecipeListItem } from './RecipeListItem'
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
}

/**
 * How many recipes to render immediately
 */
const IMMEDIATE_RENDER_COUNT = 20
/**
 * How long to wait before loading the rest
 */
const RENDER_REMAINING_TIME_MS = 1000

export const RecipeList = ({ recipes, currentCollectionId }: RecipeListProps) => {
  const track = useTracking()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  const [recipesToRender, setRecipesToRender] = React.useState<RecipeOptionPair[]>([])

  // Indicate that initial staged rendering already completed
  // and when there are re-renderings, it should be done for all recipes.
  // React would take care of diffing recipes individually
  const hasCompletedRendering = recipesToRender.length === recipes.length

  useEffect(() => {
    if (recipes.length <= IMMEDIATE_RENDER_COUNT || hasCompletedRendering) {
      setRecipesToRender(recipes)

      return () => {}
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
    (value: RecipeOptionPair) => (
      <RecipeListItem
        key={value.reference}
        recipe={value.recipe}
        reference={value.reference}
        originalId={value.originalId}
        currentCollectionId={currentCollectionId}
      />
    ),
    [currentCollectionId],
  )

  return (
    <div className={css.emeRecipeList}>
      {recipesToRender.map(renderRecipe)}
      <CTAToAllRecipes />
    </div>
  )
}
