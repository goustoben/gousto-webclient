import * as Immutable from 'immutable'

import { use_legacy_CurrentMenuRecipes, use_legacy_CurrentMenuVariants, use_legacy_Recipes } from "../recipes"
import { formatRecipeTitle } from "../recipes/title"
import { use_legacy_InStockRecipeIds } from "../stock"
import { Recipe } from "../types"
import { getFilteredVariants } from "./getFilteredVariants"
import { getSurchargeForRecipe } from "./surcharge"

import { CollectionImmutable } from './types'

const compareCoreRecipeIds = (a: Recipe, b: Recipe) =>
  parseInt(a.coreRecipeId, 10) - parseInt(b.coreRecipeId, 10)

type GetAlternativeOptionsForRecipeArgs = {
  /**
   * ID of recipe (alternative option) that is already selected
   */
  recipeId: string
  isOnDetailScreen: boolean

  categoryId?: string
}

type UseAlternativeOptionsArgs = {
  allCollections?: AllCollections
  numPortions: number
  menuId: string
}
type AllCollections = Immutable.Map<string, CollectionImmutable>

export function useAlternativeOptions({ allCollections, numPortions, menuId }: UseAlternativeOptionsArgs) {
  const recipesVariants = use_legacy_CurrentMenuVariants(menuId)
  const recipes = use_legacy_CurrentMenuRecipes()
  const allRecipesAsMap = use_legacy_Recipes()
  const recipesInStockIds = use_legacy_InStockRecipeIds({ numPortions })

  function getAlternativeOptionsForRecipe({
    recipeId,
    categoryId: collectionId,
    isOnDetailScreen,
  }: GetAlternativeOptionsForRecipeArgs) {
    if (!collectionId) {
      throw new Error(
        `Failed to obtain collectionId while determining Alternative Options for ${recipeId} recipe`,
      )
    }

    const dietaryClaims = allCollections
      ? allCollections.getIn([collectionId, 'requirements', 'dietary_claims'], null)
      : null

    const recipeAlternativeOptions = getFilteredVariants(
      recipesVariants,
      recipeId,
      recipes,
      dietaryClaims,
    )

    const recipeVariantsArray = recipeAlternativeOptions
      ? recipeAlternativeOptions.variantsList.toJS()
      : []

    const selectedRecipe = recipeId ? recipes.find((r) => r?.get('id') === recipeId) : null

    const options = [
      ...(selectedRecipe
        ? [
            {
              displayName: formatRecipeTitle(selectedRecipe),
              coreRecipeId: selectedRecipe.get('coreRecipeId'),
            },
          ]
        : []),
      ...recipeVariantsArray,
    ].sort(compareCoreRecipeIds)

    return options.map(({ coreRecipeId, displayName }) => {
      const surcharge = getSurchargeForRecipe(allRecipesAsMap, coreRecipeId, numPortions)

      return {
        recipeId: coreRecipeId,
        recipeName: displayName,
        isChecked: String(recipeId) === String(coreRecipeId),
        isOnDetailScreen,
        isOutOfStock: !recipesInStockIds.has(coreRecipeId),
        surcharge,
      }
    })
  }

  return {
    getAlternativeOptionsForRecipe,
  }
}
