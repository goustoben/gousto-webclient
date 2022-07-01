import Immutable from 'immutable'
import { getDietaryClaimSlugs } from "../recipes/dietaryClaims"
import { TransformedRecipe } from '../transformer'

export function getFilteredVariants(
  variants: Immutable.Map<string, Immutable.Map<string, any>>,
  recipeId: string,
  menuRecipes: TransformedRecipe[],
  collectionDietaryClaims: string[],
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

  if (!collectionDietaryClaims || !collectionDietaryClaims.length) {
    return { type: 'alternatives', alternatives, variantsList: alternatives }
  }

  const alternativesDietaryClaims = alternatives.filter((variant) => {
    const matchingRecipe = menuRecipes.find((recipe) => recipe.id === variant?.get('coreRecipeId'))

    if (!matchingRecipe) {
      return false
    }

    const variantDietaryClaims = getDietaryClaimSlugs(matchingRecipe)

    if (!variantDietaryClaims || !variantDietaryClaims.length) {
      return false
    }

    return collectionDietaryClaims.every((claim) => variantDietaryClaims.includes(claim))
  })

  return {
    type: 'alternatives',
    alternatives: alternativesDietaryClaims,
    variantsList: alternativesDietaryClaims,
  }
}
