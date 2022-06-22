import { useMemo } from 'react'

import Immutable from 'immutable'

import { use_legacy_InStockRecipeIds } from './stock'
import { use_legacy_CurrentMenuRecipes, use_legacy_CurrentMenuVariants } from './recipes'

import { orderCollectionRecipesByCuisine } from './recipes/personalisedSignupExperiment'
import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'
import { getRecipeReferenceInjector } from './getRecipeReferenceInjector'
import { getSelectedVariantsReplacer } from './getSelectedVariantsReplacer'
// import { useSelectedCuisines } from './useSelectedCuisines'
import { SelectedVariants } from "./useAlternativeOptions/types"

const getRecipesInCollection = (
  menuCollections: Immutable.Map<string, any>,
  collectionId: string,
): Immutable.List<string> => menuCollections.getIn([collectionId, 'recipesInCollection'], Immutable.List())

const getDietaryClaimsInCollection = (
  menuCollections: Immutable.Map<string, any>,
  collectionId: string,
) => menuCollections.getIn([collectionId, 'requirements', 'dietary_claims'], null)

type GetRecipeForCollectionIdArgs = {
  selectedCuisines?: string[]
}

export function useGetRecipesForCollectionId(
  menuId: string,
  selectedRecipeVariants: SelectedVariants,
  collections: Immutable.Map<string, any>,
  numPortions: number,
) {
  const recipes = use_legacy_CurrentMenuRecipes()
  const recipesInStockIds = use_legacy_InStockRecipeIds({ numPortions })
  const recipesVariants = use_legacy_CurrentMenuVariants(menuId)
  // const selectedCuisines = useSelectedCuisines()

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(recipesInStockIds),
    [recipesInStockIds],
  )

  const getRecipesForCollectionId = (
    collectionId: string,
    args: GetRecipeForCollectionIdArgs = {}
  ) => {
    const recipeIdsInCollection = getRecipesInCollection(collections, collectionId)
    const dietaryClaims = getDietaryClaimsInCollection(collections, collectionId)

    if (!recipeIdsInCollection || !recipes.size) {
      return {
        recipes: Immutable.List<{
                  recipe: Immutable.Map<string, string>;
                  originalId: string;
                  reference: string;
                }>()
      }
    }

    const selectedVariantReplacer = getSelectedVariantsReplacer({
      recipes,
      replacementMap: (selectedRecipeVariants || {})[collectionId] || {},
    })

    const outOfStockRecipeReplacer = getOutOfStockRecipeReplacer({
      recipesInStockIds,
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
      .map((id?: string) =>
        recipes.find((other?: Immutable.Map<string, string>) => other?.get('id') === id),
      )
      .filter((recipe?: Immutable.Map<string, string>) => Boolean(recipe))
      .map(recipeReferenceInjector)
      .map(selectedVariantReplacer)
      .map(outOfStockRecipeReplacer)

    const resultingRecipes = originalRecipes.sort(recipeComparatorForOutOfStock)

    if (args.selectedCuisines) {
      const { orderedRecipes } = orderCollectionRecipesByCuisine(resultingRecipes as Immutable.List<any>, args.selectedCuisines)

      return { recipes: orderedRecipes }
    }

    return { recipes: resultingRecipes }
  }

  return {
    getRecipesForCollectionId,
  }
}
