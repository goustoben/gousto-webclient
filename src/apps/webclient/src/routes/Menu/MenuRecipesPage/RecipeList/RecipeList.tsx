import React, { useEffect, useLayoutEffect } from 'react'

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

  useLayoutEffect(() => {
    if (recipes.length <= IMMEDIATE_RENDER_COUNT) {
      setRecipesToRender(recipes)
    }

    setRecipesToRender(recipes.slice(0, IMMEDIATE_RENDER_COUNT))

    const renderRest = setTimeout(() => {
      setRecipesToRender(recipes)
    }, RENDER_REMAINING_TIME_MS)

    return () => {
      clearTimeout(renderRest)
    }
  }, [recipes])

  return (
    <div className={css.emeRecipeList}>
      {recipesToRender.map((value, index) => (
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
