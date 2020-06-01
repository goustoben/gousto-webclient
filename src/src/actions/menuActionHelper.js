import { activeMenuForDate } from 'routes/Menu/selectors/menu'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { collectionRecipesTransformer } from 'apis/transformers/collectionRecipes'
import { menuLoadCollections, loadRecipesForAllCollections } from 'actions/menuCollections'
import { locationQuery } from '../selectors/routing'
import { actionTypes } from './actionTypes'
import { menuSetLandingCollection } from '../routes/Menu/actions/menuSetLandingCollection'

const basketCurrentMenuIdChange = ({id}) => ({
  type: actionTypes.BASKET_CURRENT_MENU_ID_CHANGE,
  menuId: id
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
    const foundMatchingRecipeFromStock = storedRecipes.find((obj) => obj.id === stockEntry.recipeId.toString())

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

const loadMenuCollectionsWithMenuService = async (dispatch, getState, date, background) => {
  const state = getState()
  const menuServiceData = state.menuService

  if (!menuServiceData || !menuServiceData.data || !menuServiceData.data.length) {
    return
  }

  const brandData = state.brand
  const activeMenu = activeMenuForDate(menuServiceData, date)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData, brandData)
  const transformedCollectionRecipes = collectionRecipesTransformer(activeMenu)

  await menuLoadCollections(date, background, transformedCollections)(dispatch, getState)
  await loadRecipesForAllCollections(transformedRecipes, transformedCollectionRecipes)(dispatch, getState)

  // this is unfortunately required because menuSetLandingCollection
  // requires collections, collectionRecipes and recipeStock to all be loaded
  // it doesn't work without this as the thunk runs before all the store updates have completed
  await Promise.resolve()

  dispatch(basketCurrentMenuIdChange(activeMenu))
  dispatch(menuSetLandingCollection())
}

export {
  getStockAvailability,
  loadMenuCollectionsWithMenuService
}
