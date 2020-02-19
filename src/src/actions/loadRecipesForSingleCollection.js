import { menuReceiveCollectionRecipes, menuReceiveMenu } from 'actions/menu'

export function loadRecipesForSingleCollection(collectionId, idsOnly, transformedRecipes, transformedCollectionRecipesIds) {
  return async (dispatch) => {
    if (transformedRecipes) {
      if (transformedCollectionRecipesIds) {
        const recipesInCollectionIds = transformedCollectionRecipesIds[collectionId]

        if (recipesInCollectionIds) {
          const recipesInCollection = recipesInCollectionIds.map((recipeRelationship) => transformedRecipes.find((recipe) => recipe.coreRecipeId === recipeRelationship.core_recipe_id.toString()))

          dispatch(menuReceiveCollectionRecipes(collectionId, recipesInCollection))
        }
      }

      if (!idsOnly) {
        dispatch(menuReceiveMenu(transformedRecipes))
      }
    }
  }
}
