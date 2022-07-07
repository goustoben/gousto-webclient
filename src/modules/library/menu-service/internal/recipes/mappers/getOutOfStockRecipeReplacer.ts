import { MenuAPIResponseDataItem } from '../../http'
import { TransformedRecipe } from '../../transformer'

import { getVariantsForRecipe } from '../../recipeOptions'

/**
 * out-of-stock recipes should be replaced with an in-stock variant, if possible
 */
export function getOutOfStockRecipeReplacer({
  menu,
  recipes,
  isRecipeInStock,
  numPortions,
  dietaryClaims,
}: {
  menu: MenuAPIResponseDataItem
  recipes: TransformedRecipe[]
  isRecipeInStock: (coreRecipeId: string, numPortions: number) => boolean
  numPortions: number
  dietaryClaims: string[]
}) {
  const wrapRecipe = (recipe: TransformedRecipe, reference: string) => ({
    recipe,
    originalId: recipe.id,
    reference,
  })

  return (item: { recipe: TransformedRecipe; reference: string }) => {
    const { recipe, reference } = item

    if (isRecipeInStock(recipe.id, numPortions)) {
      return wrapRecipe(recipe, reference)
    }

    const recipesAlternatives = getVariantsForRecipe(menu, recipe.id, recipes, dietaryClaims)

    if (!recipesAlternatives || recipesAlternatives.type !== 'alternatives' || !recipesAlternatives.alternatives) {
      return wrapRecipe(recipe, reference)
    }

    const recipeAlternativeWhichIsInStock = recipesAlternatives.alternatives.find((r) =>
      isRecipeInStock(r.coreRecipeId, numPortions),
    )

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find((r) => r.id === recipeAlternativeWhichIsInStock.coreRecipeId)

      if (alternative) {
        return wrapRecipe(alternative, reference)
      }

      // TODO should we handle an error here?
    }

    return wrapRecipe(recipe, reference)
  }
}
