import Immutable from 'immutable'

import { getFilteredVariants } from './useAlternativeOptions/getFilteredVariants'

export function getOutOfStockRecipeReplacer({
  recipes,
  recipesVariants,
  recipesInStockIds,
  dietaryClaims,
}: {
  recipes: Immutable.List<Immutable.Map<string, any>>
  recipesVariants: Immutable.Map<string, any>
  recipesInStockIds: Set<string>
  dietaryClaims: Immutable.List<string> | null
}) {
  const wrapRecipe = (recipe: Immutable.Map<string, string>, reference: string) => ({
    recipe,
    originalId: recipe.get('id'),
    reference,
  })

  return (item?: { recipe: Immutable.Map<string, string>; reference: string }) => {
    if (!item) {
      return item
    }

    const { recipe, reference } = item

    if (recipesInStockIds.has(recipe.get('id'))) {
      return wrapRecipe(recipe, reference)
    }

    const recipesAlternatives = getFilteredVariants(
      recipesVariants,
      recipe.get('id'),
      recipes,
      dietaryClaims,
    )

    if (!recipesAlternatives || recipesAlternatives.type !== 'alternatives' || !recipesAlternatives.alternatives) {
      return wrapRecipe(recipe, reference)
    }

    const recipeAlternativeWhichIsInStock = recipesAlternatives.alternatives!.find(
      r => recipesInStockIds.has(r?.get('coreRecipeId')),
    )

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find(
        (r) => r?.get('id') === recipeAlternativeWhichIsInStock.get('coreRecipeId'),
      )

      return wrapRecipe(alternative!, reference)
    }

    return wrapRecipe(recipe, reference)
  }
}
