import Immutable from 'immutable'
import { getDietaryClaimSlugs } from "../recipes/dietaryClaims"

import { RecipeImmutable } from './types'

const ALLERGEN_DAIRY_FREE = 'dairy-free'
const ALLERGEN_GLUTEN_FREE = 'gluten-free'

export const getRecipeAllergenInformation = (
  recipeId: string,
  recipes: RecipeImmutable[],
): { containsGlutenOrDairy: boolean } => {
  const recipe = recipes.find((r) => r.get('id') === recipeId)
  const dietaryTags = getDietaryClaimSlugs(recipe)
  const hasGlutenOrDairyAllergens = Boolean(
    dietaryTags.find((tag) => tag === ALLERGEN_DAIRY_FREE || tag === ALLERGEN_GLUTEN_FREE),
  )

  return { containsGlutenOrDairy: hasGlutenOrDairyAllergens }
}
