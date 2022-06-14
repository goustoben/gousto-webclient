import Immutable from 'immutable'

import { getVariantsForRecipeForCurrentCollection } from 'routes/Menu/selectors/recipe'

export function getOutOfStockRecipeReplacer({
  recipes,
  recipesVariants,
  recipesInStock,
  dietaryClaims,
}: {
  recipes: Immutable.Map<string, string>[]
  recipesVariants: Immutable.Map<string, any>
  recipesInStock: Immutable.Map<string, string>[]
  dietaryClaims: string[] | null
}) {
  const recipesInStockIds = new Set(recipesInStock.map((r) => r.get('id')))

  const wrapRecipe = (recipe: Immutable.Map<string, string>, reference: string) => ({
    recipe,
    originalId: recipe.get('id'),
    reference,
  })

  return ({ recipe, reference }: { recipe: Immutable.Map<string, string>; reference: string }) => {
    if (recipesInStockIds.has(recipe.get('id'))) {
      return wrapRecipe(recipe, reference)
    }

    const recipesAlternatives = getVariantsForRecipeForCurrentCollection(
      recipesVariants,
      recipe.get('id'),
      recipes,
      dietaryClaims,
    )

    if (!recipesAlternatives || recipesAlternatives.type !== 'alternatives') {
      return wrapRecipe(recipe, reference)
    }

    const recipeAlternativeWhichIsInStock = recipesAlternatives.alternatives.find(
      (r: Immutable.Map<string, string>) => recipesInStockIds.has(r.get('coreRecipeId')),
    )

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find(
        (r) => r.get('id') === recipeAlternativeWhichIsInStock.get('coreRecipeId'),
      )

      return wrapRecipe(alternative!, reference)
    }

    return wrapRecipe(recipe, reference)
  }
}
