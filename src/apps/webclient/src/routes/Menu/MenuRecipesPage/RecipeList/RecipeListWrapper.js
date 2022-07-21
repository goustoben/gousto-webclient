import React, { useEffect, useMemo, useRef } from 'react'

import { areEqualArrays } from 'routes/Menu/MenuRecipesPage/RecipeList/utils'

import { useStock } from '../../domains/basket'
import { useCurrentCollectionId } from '../../domains/collections'
import { useMenu } from '../../domains/menu'
import { useSelectedCuisines } from '../../hooks/useSelectedCuisines'
import { RecipeList } from './RecipeList'
import { useSoldOutTracking } from './useSoldOutTracking'

const RecipeListWrapper = (ownProps) => {
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { getOutOfStockRecipeIds } = useStock()
  const { trackSoldOutRecipes } = useSoldOutTracking()

  const selectedCuisines = useSelectedCuisines()

  const recipes = useMemo(
    () =>
      getRecipesForCollectionId(currentCollectionId, {
        selectedCuisines,
      }),
    [getRecipesForCollectionId, currentCollectionId, selectedCuisines],
  )

  const shownRecipeIds = recipes.recipes.map(({ recipe }) => recipe.get('id')).toJS()
  const recipesIdsRef = useRef(shownRecipeIds)

  if (!areEqualArrays(recipesIdsRef.current, shownRecipeIds)) {
    recipesIdsRef.current = shownRecipeIds
  }

  // to avoid eslint react-hooks/use-exhaustive-deps rule we have to introduce a new variable
  const recipeIds = recipesIdsRef.current
  useEffect(() => {
    const soldOutRecipes = getOutOfStockRecipeIds(recipeIds)
    trackSoldOutRecipes(soldOutRecipes)
  }, [recipeIds, getOutOfStockRecipeIds, trackSoldOutRecipes])

  return (
    <RecipeList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      currentCollectionId={currentCollectionId}
      recipes={recipes.recipes}
    />
  )
}

export { RecipeListWrapper }
