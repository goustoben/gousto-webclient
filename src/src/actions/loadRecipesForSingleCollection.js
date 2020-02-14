import { fetchCollectionRecipes } from 'apis/collections'
import { menuReceiveCollectionRecipes, menuReceiveMenu } from 'actions/menu'

export function loadRecipesForSingleCollection(date, collectionId, idsOnly, transformedRecipes, transformedCollectionRecipesIds) {
  return async (dispatch, getState) => {
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

      return
    }

    const state = getState()
    const { features } = state
    const menuId = features.getIn(['menu_id', 'value'])
    const accessToken = state.auth.get('accessToken')
    const reqData = {
      includes: ['ingredients', 'allergens', 'taxonomy'],
    }
    if (menuId) {
      reqData['filters[menu_id]'] = menuId
    } else {
      reqData['filters[available_on]'] = date
    }

    if (idsOnly) {
      reqData['fields[]'] = 'id'
    }
    const { data: items } = await fetchCollectionRecipes(accessToken, collectionId, reqData)
    if (items.recipes) {
      dispatch(menuReceiveCollectionRecipes(collectionId, items.recipes))
    }
    if (!idsOnly) {
      dispatch(menuReceiveMenu(items.recipes))
    }
  }
}
