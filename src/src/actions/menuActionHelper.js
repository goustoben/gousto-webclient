import { activeMenuForDate } from 'routes/Menu/selectors/menu'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { locationQuery } from '../selectors/routing'
import { actionTypes } from './actionTypes'

export function menuCollectionsReceive(collections) {
  return {
    type: actionTypes.MENU_COLLECTIONS_RECEIVE,
    collections,
  }
}

export function menuReceiveMenu(recipes) {
  return {
    type: actionTypes.RECIPES_RECEIVE,
    recipes,
  }
}

const basketCurrentMenuIdChange = ({ id }) => ({
  type: actionTypes.BASKET_CURRENT_MENU_ID_CHANGE,
  menuId: id,
})

function getStockAvailability(getState, recipeStock) {
  const { recipes } = getState()
  const query = locationQuery(getState())
  const isAdminLink = query && query['preview[menu_id]']
  const includedData = recipes
  const storedRecipes = Object.values(includedData.toJS())
  const recipeStockList = Object.values(recipeStock)

  if (isAdminLink) {
    return storedRecipes.reduce((acc, recipe) => {
      acc[recipe.id] = {
        2: 1000,
        4: 1000,
        committed: false,
      }

      return acc
    }, {})
  }

  return recipeStockList.reduce((acc, stockEntry) => {
    const committed = stockEntry.committed === '1'
    const foundMatchingRecipeFromStock = storedRecipes.find(
      (obj) => obj.id === stockEntry.recipeId.toString()
    )

    if (foundMatchingRecipeFromStock) {
      acc[foundMatchingRecipeFromStock.id] = {
        2: committed ? parseInt(stockEntry.number, 10) : 1000,
        4: committed ? parseInt(stockEntry.familyNumber, 10) : 1000,
        committed,
      }
    }

    return acc
  }, {})
}

const loadMenuCollectionsWithMenuService = async (dispatch, getState, date) => {
  const state = getState()
  const menuServiceData = state.menuService

  if (!menuServiceData || !menuServiceData.data || !menuServiceData.data.length) {
    return
  }

  const brandData = state.brand
  const activeMenu = activeMenuForDate(menuServiceData, date)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData, brandData)

  dispatch(menuCollectionsReceive(transformedCollections))
  dispatch(menuReceiveMenu(transformedRecipes))
  dispatch(basketCurrentMenuIdChange(activeMenu))
}

export { getStockAvailability, loadMenuCollectionsWithMenuService }
