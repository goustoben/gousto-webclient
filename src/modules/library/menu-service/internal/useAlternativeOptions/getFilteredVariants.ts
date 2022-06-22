import Immutable from 'immutable'
import { getDietaryClaimSlugs } from "../recipes/dietaryClaims"

export function getFilteredVariants(
  variants: Immutable.Map<string, Immutable.Map<string, any>>,
  recipeId: string,
  menuRecipes: Immutable.List<Immutable.Map<string, any>>,
  collectionDietaryClaims: Immutable.List<string> | null,
) {
  if (!variants) {
    return null
  }

  const recipeVariants = variants.get(recipeId)

  if (!recipeVariants) {
    return null
  }

  const sides = recipeVariants.get('sides')

  if (sides && sides.size) {
    return { type: 'sides', sides, variantsList: sides }
  }

  const alternatives: Immutable.List<Immutable.Map<string, any>> = recipeVariants.get('alternatives')

  if (!alternatives || !alternatives.size) {
    return null
  }

  if (!collectionDietaryClaims || !collectionDietaryClaims.size) {
    return { type: 'alternatives', alternatives, variantsList: alternatives }
  }

  const alternativesDietaryClaims = alternatives.filter((variant) => {
    const matchingRecipe = menuRecipes.find((recipe) => recipe?.get('id') === variant?.get('coreRecipeId'))
    const variantRecipeDietaryAttributes = getDietaryClaimSlugs(matchingRecipe)

    if (!variantRecipeDietaryAttributes || !variantRecipeDietaryAttributes.size) {
      return false
    }

    return collectionDietaryClaims.every((claim) => variantRecipeDietaryAttributes.includes(claim!))
  })

  return {
    type: 'alternatives',
    alternatives: alternativesDietaryClaims,
    variantsList: alternativesDietaryClaims,
  }
}
