import Immutable from 'immutable'
import { TransformedRecipe } from '../../transformer'

import { getFilteredVariants } from '../../useAlternativeOptions/getFilteredVariants'

export function getOutOfStockRecipeReplacer({
  recipes,
  recipesVariants,
  recipesInStockIds,
  dietaryClaims,
}: {
  recipes: TransformedRecipe[]
  recipesVariants: Immutable.Map<string, any>
  recipesInStockIds: Set<string>
  dietaryClaims: string[]
}) {
  const wrapRecipe = (recipe: TransformedRecipe, reference: string) => ({
    recipe,
    originalId: recipe.id,
    reference,
  })

  return (item: { recipe: TransformedRecipe; reference: string }) => {
    const { recipe, reference } = item

    if (recipesInStockIds.has(recipe.id)) {
      return wrapRecipe(recipe, reference)
    }

    const recipesAlternatives = getFilteredVariants(recipesVariants, recipe.id, recipes, dietaryClaims)

    if (!recipesAlternatives || recipesAlternatives.type !== 'alternatives' || !recipesAlternatives.alternatives) {
      return wrapRecipe(recipe, reference)
    }

    const recipeAlternativeWhichIsInStock = recipesAlternatives.alternatives.find((r) =>
      recipesInStockIds.has(r?.get('coreRecipeId')),
    )

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find((r) => r.id === recipeAlternativeWhichIsInStock.get('coreRecipeId'))

      if (alternative) {
        return wrapRecipe(alternative, reference)
      }

      // TODO should we handle an error here?
    }

    return wrapRecipe(recipe, reference)
  }
}
