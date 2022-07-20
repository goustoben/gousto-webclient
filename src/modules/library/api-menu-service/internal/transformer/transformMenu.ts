import { MenuAPIResponseDataItem, MenuServiceData } from '../http'
import { collectionsTransformer } from './collections'
import { ingredientTransformer } from './ingredientTransformer'
import { recipeTransformer } from './recipes'
import { formatIngredients } from './recipeHelpers'

function transformRecipes(menuServiceData: MenuServiceData['data'], menu: MenuAPIResponseDataItem) {
  if (!menuServiceData) {
    return []
  }

  return menu.relationships.recipes.data.map((recipe, index) => {
    const individualRecipeId = recipe.core_recipe_id

    const currentRecipe = menuServiceData.recipe[individualRecipeId]
    const normalisedAttributes = currentRecipe && currentRecipe.attributes
    const normalisedRelationships = currentRecipe && currentRecipe.relationships

    const formattedIngredients = formatIngredients(normalisedRelationships, menuServiceData)
    const finalIngredients = formattedIngredients.map(ingredientTransformer)

    // use the first recipe as the featured one (base on recommendations)
    const isFeaturedRecipe = index === 0

    return recipeTransformer({
      normalisedAttributes,
      finalIngredients,
      activeMenu: menu,
      individualRecipeId,
      isFeaturedRecipe,
      recipeMeta: recipe.meta,
    })
  })
}

/**
 * Get the inner type of an array
 */
type Unpacked<T> = T extends (infer U)[] ? U : T

export type TransformedRecipe = Unpacked<ReturnType<typeof transformRecipes>>
export type TransformedCollection = Unpacked<ReturnType<typeof collectionsTransformer>>

/**
 * Transforms and flattens the menu service response into an easier-to-query format
 */
export function transformMenu(menuServiceData: MenuServiceData['data'], menu: MenuAPIResponseDataItem) {
  const transformedCollections: TransformedCollection[] = collectionsTransformer(menuServiceData, menu)
  const transformedRecipes: TransformedRecipe[] = transformRecipes(menuServiceData, menu)

  return {
    collections: transformedCollections,
    recipes: transformedRecipes,
  }
}
