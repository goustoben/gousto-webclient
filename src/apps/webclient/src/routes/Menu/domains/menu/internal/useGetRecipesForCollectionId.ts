import { useMemo } from 'react'

import Immutable from 'immutable'
import { useSelector } from 'react-redux'

import { getRecipesInCollection } from 'routes/Menu/selectors/collections'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { getInStockRecipes } from 'routes/Menu/selectors/recipeList'
import { getCurrentMenuVariants, getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'

import { orderCollectionRecipesByCuisine } from '../../collections'
import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'
import { getRecipeReferenceInjector } from './getRecipeReferenceInjector'
import { getSelectedVariantsReplacer } from './getSelectedVariantsReplacer'
import { useSelectedCuisines } from './useSelectedCuisines'

const getDietaryClaimsInCollection = (
  menuCollections: Immutable.Map<string, any>,
  collectionId: string,
) => menuCollections.getIn([collectionId, 'requirements', 'dietary_claims'], null)

export const useGetRecipesForCollectionId = (collections: Immutable.Map<string, any>) => {
  const recipes = useSelector(getCurrentMenuRecipes)
  const recipesInStock = useSelector(getInStockRecipes)
  const recipesVariants = useSelector(getCurrentMenuVariants)
  const selectedRecipeVariants = useSelector(getSelectedRecipeVariants)
  const selectedCuisines = useSelectedCuisines()

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(recipesInStock),
    [recipesInStock],
  )

  const getRecipesForCollectionId = (collectionId: string) => {
    const recipeIdsInCollection = getRecipesInCollection(collections, collectionId)
    const dietaryClaims = getDietaryClaimsInCollection(collections, collectionId)

    if (!recipeIdsInCollection || !recipes.size) {
      return { recipes: Immutable.List() }
    }

    const selectedVariantReplacer = getSelectedVariantsReplacer({
      recipes,
      replacementMap: (selectedRecipeVariants || {})[collectionId] || {},
    })

    const outOfStockRecipeReplacer = getOutOfStockRecipeReplacer({
      recipesInStock,
      recipes,
      recipesVariants,
      dietaryClaims,
    })

    const recipeReferenceInjector = getRecipeReferenceInjector({ recipesVariants })

    // The order of mappers below matters:
    //  * ensure the recipes are wrapped in an envelop with additional meta data: originalId and reference
    //  * ensure we prefer to show variants customer explicitly picked
    //  * ensure any out of stock recipes are replaced by in stock alternatives
    //  * ensure any remaining out of stock recipes are moved to the end of the list

    const originalRecipes = recipeIdsInCollection
      .map((id: string) =>
        recipes.find((other: Immutable.Map<string, string>) => other.get('id') === id),
      )
      .filter((recipe: Immutable.Map<string, string>) => Boolean(recipe))
      .map(recipeReferenceInjector)
      .map(selectedVariantReplacer)
      .map(outOfStockRecipeReplacer)

    const resultingRecipes = originalRecipes.sort(recipeComparatorForOutOfStock)

    if (selectedCuisines) {
      const { orderedRecipes } = orderCollectionRecipesByCuisine(resultingRecipes, selectedCuisines)

      return { recipes: orderedRecipes }
    }

    return { recipes: resultingRecipes }
  }

  return {
    getRecipesForCollectionId,
  }
}
