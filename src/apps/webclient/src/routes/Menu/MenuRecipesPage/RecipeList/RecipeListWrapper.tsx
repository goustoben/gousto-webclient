<<<<<<< HEAD:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.tsx
import React, { useEffect, useRef, useMemo } from 'react'

import { useSelector } from 'react-redux'
=======
import React, { useEffect, useMemo, useRef } from 'react'
>>>>>>> origin/develop:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.js

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
<<<<<<< HEAD:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.tsx
  const selectedVariants = useSelector(getSelectedRecipeVariants)
=======
>>>>>>> origin/develop:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.js

  const selectedCuisines = useSelectedCuisines()

  const recipes = useMemo(
    () =>
      getRecipesForCollectionId(currentCollectionId, {
        selectedCuisines,
<<<<<<< HEAD:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.tsx
        selectedRecipeVariants: selectedVariants,
      }),
    [getRecipesForCollectionId, currentCollectionId, selectedCuisines, selectedVariants],
  )

  const shownRecipeIds = recipes.map(({ recipe }) => recipe.id)
=======
      }),
    [getRecipesForCollectionId, currentCollectionId, selectedCuisines],
  )

  const shownRecipeIds = recipes.recipes.map(({ recipe }) => recipe.get('id')).toJS()
>>>>>>> origin/develop:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.js
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
<<<<<<< HEAD:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.tsx
      recipes={recipes}
=======
      recipes={recipes.recipes}
>>>>>>> origin/develop:src/apps/webclient/src/routes/Menu/MenuRecipesPage/RecipeList/RecipeListWrapper.js
    />
  )
}

export { RecipeListWrapper }
