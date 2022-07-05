import { MenuAPIResponseDataItem } from '../http'
import { getDietaryClaimSlugs } from "../recipes/dietaryClaims"
import { TransformedRecipe } from '../transformer'

export function getVariantsForRecipe(
  menu: MenuAPIResponseDataItem,
  coreRecipeId: string,
  menuRecipes: TransformedRecipe[],
  collectionDietaryClaims: string[],
) {
  const {
    relationships: { recipe_options: { data: menuVariantGroups } }
  } = menu

  if (!menuVariantGroups || menuVariantGroups.length === 0) {
    return null
  }

  const recipeVariantGroup = menuVariantGroups.find(group => group.core_recipe_id === coreRecipeId)

  if (!recipeVariantGroup || !recipeVariantGroup.relationships || recipeVariantGroup.relationships.length === 0) {
    return null
  }

  const variantRecipes = recipeVariantGroup.relationships.map(recipe => ({
    id: recipe.data.id,
    coreRecipeId: recipe.data.core_recipe_id,
    displayName: recipe.data.attributes.short_display_name
  }))

  // return the main recipe followed by the variants
  const alternatives = [
    {
      id: recipeVariantGroup.id,
      coreRecipeId: recipeVariantGroup.core_recipe_id,
      displayName: recipeVariantGroup.attributes.short_display_name
    },

    ...variantRecipes
  ]

  // all recipes must match the dietary claims in the collection
  // return early if there are none to match
  if (!collectionDietaryClaims || !collectionDietaryClaims.length) {
    return { type: 'alternatives', alternatives, variantsList: alternatives }
  }

  const alternativesDietaryClaims = alternatives.filter((variant) => {
    const matchingRecipe = menuRecipes.find((recipe) => recipe.id === variant.coreRecipeId)

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
