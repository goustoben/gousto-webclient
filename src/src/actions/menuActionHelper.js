import { activeMenuForDateTransformer } from 'apis/transformers/activeMenuForDate'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { collectionRecipesTransformer } from 'apis/transformers/collectionRecipes'
import { menuLoadCollections, loadRecipesForAllCollections } from 'actions/menuCollections'
import { menuSetLandingCollection } from '../routes/Menu/actions/menuSetLandingCollection'

function getStockAvailability(getState, recipeStock) {
  const includedData = getState().recipes
  const storedRecipes = Object.values(includedData.toJS())
  const recipeStockList = Object.values(recipeStock)

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
  const activeMenu = activeMenuForDateTransformer(menuServiceData, date)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData, brandData)
  const transformedCollectionRecipes = collectionRecipesTransformer(activeMenu)

  await menuLoadCollections(date, background, transformedCollections)(dispatch, getState)
  await loadRecipesForAllCollections(transformedRecipes, transformedCollectionRecipes)(dispatch, getState)

  // this is unfortunately required because menuSetLandingCollection
  // requires collections, collectionRecipes and recipeStock to all be loaded
  // it doesn't work without this as the thunk runs before all the store updates have completed
  await Promise.resolve()

  dispatch(menuSetLandingCollection())
}

export {
  getStockAvailability,
  loadMenuCollectionsWithMenuService
}
