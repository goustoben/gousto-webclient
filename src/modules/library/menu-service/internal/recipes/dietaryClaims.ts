import { TransformedRecipe } from '../transformer'

export function getDietaryClaimSlugs(recipe: TransformedRecipe) {
  return recipe.dietaryClaims.map((tag) => tag.slug)
}
