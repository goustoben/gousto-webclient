import React, { useEffect, useRef, useMemo } from 'react'

import { useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { areEqualArrays } from 'routes/Menu/MenuRecipesPage/RecipeList/utils'
import { useStock } from 'routes/Menu/domains/stock'
import { getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'

import { useCurrentCollectionId } from '../../domains/collections'
import { useMenu } from '../../domains/menu'
import { useSelectedCuisines } from '../../hooks/useSelectedCuisines'
import { RecipeList } from './RecipeList'
import { useSoldOutTracking } from './useSoldOutTracking'

const RecipeListWrapper = (ownProps: any) => {
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { isRecipeOutOfStock } = useStock()
  const { trackSoldOutRecipes } = useSoldOutTracking()
  const selectedVariants = useSelector(getSelectedRecipeVariants)

  const isDietaryCollectionLinksEnabled = useIsOptimizelyFeatureEnabled(
    'kales_dietary_category_links',
  )

  const selectedCuisines = useSelectedCuisines()

  const recipes = useMemo(
    () =>
      getRecipesForCollectionId(currentCollectionId, {
        selectedCuisines,
        selectedRecipeVariants: selectedVariants,
      }),
    [getRecipesForCollectionId, currentCollectionId, selectedCuisines, selectedVariants],
  )

  const shownRecipeIds = recipes.map(({ recipe }) => recipe.id)
  const recipesIdsRef = useRef(shownRecipeIds)

  if (!areEqualArrays(recipesIdsRef.current, shownRecipeIds)) {
    recipesIdsRef.current = shownRecipeIds
  }

  // to avoid eslint react-hooks/use-exhaustive-deps rule we have to introduce a new variable
  const recipeIds = recipesIdsRef.current
  useEffect(() => {
    const soldOutRecipes = recipeIds.filter((r) => isRecipeOutOfStock(r, 2))
    trackSoldOutRecipes(soldOutRecipes)
  }, [recipeIds, isRecipeOutOfStock, trackSoldOutRecipes])

  return (
    <RecipeList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      currentCollectionId={currentCollectionId}
      recipes={recipes}
      isDietaryCollectionLinksEnabled={isDietaryCollectionLinksEnabled}
    />
  )
}

RecipeListWrapper.whyDidYouRender = true

export { RecipeListWrapper }
