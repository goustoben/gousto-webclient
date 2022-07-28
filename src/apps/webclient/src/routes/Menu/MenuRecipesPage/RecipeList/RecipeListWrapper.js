import React, { useEffect, useMemo, useRef, useCallback } from 'react'

import { areEqualArrays } from 'routes/Menu/MenuRecipesPage/RecipeList/utils'
import { useBasket } from 'routes/Menu/domains/basket'
import { useStock } from 'routes/Menu/domains/stock'

import { useCurrentCollectionId } from '../../domains/collections'
import { useMenu } from '../../domains/menu'
import { useSelectedCuisines } from '../../hooks/useSelectedCuisines'
import { RecipeList } from './RecipeList'
import { useSoldOutTracking } from './useSoldOutTracking'

const RecipeListWrapper = (ownProps) => {
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { isRecipeInStock, getStockForRecipe } = useStock()
  const { trackSoldOutRecipes } = useSoldOutTracking()
  const { numPortions } = useBasket()

  const getOutOfStockRecipeIds = useCallback(
    (recipeIds) => {
      if (recipeIds.some((id) => getStockForRecipe(id, numPortions) === null)) {
        return null
      }

      return recipeIds.filter((id) => isRecipeInStock(id, numPortions))
    },
    [numPortions, isRecipeInStock, getStockForRecipe],
  )

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
