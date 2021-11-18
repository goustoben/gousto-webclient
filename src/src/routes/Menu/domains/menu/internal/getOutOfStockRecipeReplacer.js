import { getVariantsForRecipeForCurrentCollection } from 'routes/Menu/selectors/recipe'

export const getOutOfStockRecipeReplacer = ({
  recipes,
  recipesVariants,
  recipesInStock,
  dietaryClaims,
}) => {
  const recipesInStockIds = new Set(recipesInStock.map(r => r.get('id')))

  const wrapRecipe = recipe => ({recipe, originalId: recipe.get('id')})

  return ({recipe}) => {
    if (recipesInStockIds.has(recipe.get('id'))) {
      return wrapRecipe(recipe)
    }

    const recipesAlternatives = getVariantsForRecipeForCurrentCollection(
      recipesVariants,
      recipe.get('id'),
      recipes,
      dietaryClaims,
    )

    if (!recipesAlternatives || recipesAlternatives.type !== 'alternatives') {
      return wrapRecipe(recipe)
    }

    const recipeAlternativeWhichIsInStock = recipesAlternatives
      .alternatives
      .find(r => recipesInStockIds.has(r.get('coreRecipeId')))

    if (recipeAlternativeWhichIsInStock) {
      const alternative = recipes.find(r => r.get('id') === recipeAlternativeWhichIsInStock.get('coreRecipeId'))

      return wrapRecipe(alternative)
    }

    return wrapRecipe(recipe)
  }
}
