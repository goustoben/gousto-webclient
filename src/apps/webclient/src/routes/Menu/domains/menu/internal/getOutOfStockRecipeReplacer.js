import { getVariantsForRecipeForCurrentCollection } from 'routes/Menu/selectors/recipe'

export const getOutOfStockRecipeReplacer = ({
  recipes,
  recipesVariants,
  recipesInStock,
  dietaryClaims,
}) => {
  const recipesInStockIds = new Set(recipesInStock.map((r) => r.get('id')))

  const wrapRecipe = (recipe, reference) => ({ recipe, originalId: recipe.get('id'), reference })

  return ({ recipe, reference }) => {
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

    const recipeAlternativeWhichIsInStock = recipesAlternatives.alternatives.find((r) =>
      recipesInStockIds.has(r.get('coreRecipeId')),
    )

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find(
        (r) => r.get('id') === recipeAlternativeWhichIsInStock.get('coreRecipeId'),
      )

      return wrapRecipe(alternative, reference)
    }

    return wrapRecipe(recipe, reference)
  }
}
