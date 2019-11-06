import { fetchCollectionRecipes } from 'apis/collections'
import { menuReceiveCollectionRecipes, menuReceiveMenu } from 'actions/menu'

// TODO [TR-432]: change menuLoadCollectionRecipes name as it clashes with menuLoadCollectionsRecipes
export function menuLoadCollectionRecipes(date, collectionId, idsOnly, transformedRecipes, transformedCollectionRecipesIds) {
  return async (dispatch, getState) => {
    if (transformedRecipes) {

      if (transformedCollectionRecipesIds) {
        const recipesInCollectionIds = transformedCollectionRecipesIds[collectionId]

        if (recipesInCollectionIds) {
          const recipesInCollection = recipesInCollectionIds.map((recipeRelationship) => {

            return transformedRecipes.find((recipe) => {

              return recipe.id === recipeRelationship.id
            })
          })

          dispatch(menuReceiveCollectionRecipes(collectionId, recipesInCollection))
        }
      }

      dispatch(menuReceiveMenu(transformedRecipes)) // TODO : should only be called once out side menuLoadCollectionRecipes

      return
    }

    const state = getState()
    const { features } = state
    const menuId = features.getIn(['menu_id', 'value'])
    const accessToken = state.auth.get('accessToken')
    const reqData = {
      includes: ['ingredients', 'allergens', 'taxonomy'],
    }
    if (!!menuId) {
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
