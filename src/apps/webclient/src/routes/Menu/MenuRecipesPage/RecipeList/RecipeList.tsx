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

// function usePrevious(value) {
//   const ref = useRef()
//   useEffect(() => {
//     ref.current = value
//   })
//   return ref.current
// }

/**
 * How many recipes to render immediately
 */
const IMMEDIATE_RENDER_COUNT = 15
/**
 * How long to wait before loading the rest
 */
const RENDER_REMAINING_TIME_MS = 1000

function usePrevious(value: any) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })

  return ref.current
}

export const RecipeList = ({
  recipes,
  currentCollectionId,
  isDietaryCollectionLinksEnabled = false,
}: RecipeListProps) => {
  const track = useTracking()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  const [recipesToRender, setRecipesToRender] = React.useState<RecipeOptionPair[]>([])
  // const prevRecipes = usePrevious(recipesToRender)

  const prevRecipes = usePrevious(recipes) as any

  useLayoutEffect(() => {
    // Exit early if recipes = last recieps
    // if (prevRecipes?.length === recipes.length) return

    if (recipes.length <= IMMEDIATE_RENDER_COUNT || prevRecipes?.length === recipes.length) {
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
  }, [recipes])

  const vpp = useCallback(
    (value: RecipeOptionPair, index: number) => (
      <RecipeListItemMemoised
        key={value.originalId}
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
      {recipesToRender.map(vpp)}
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

const RecipeListItemMemoised = memo(RecipeListItem) as any

RecipeListItemMemoised.whyDidYouRender = true

RecipeList.whyDidYouRender = true
