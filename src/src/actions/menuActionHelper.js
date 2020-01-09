import { activeMenuForDateTransformer } from 'apis/transformers/activeMenuForDate'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { collectionRecipesTransformer } from 'apis/transformers/collectionRecipes'
import { menuLoadCollections, loadRecipesForAllCollections } from 'actions/menuCollections'

function getStockAvailability(getState, recipeStock) {
  const includedData = getState().recipes
  const storedRecipes = Object.values(includedData.toJS())
  const recipeStockList = Object.values(recipeStock)

  return recipeStockList.reduce((acc, stockEntry) => {
    const committed = stockEntry.committed === '1'

    const foundMatchingRecipeFromStock = storedRecipes.find((obj) => {
      return obj.coreRecipeId === stockEntry.recipeId.toString()
    })

    if(foundMatchingRecipeFromStock) {
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
  const brandData = state.brand
  const activeMenu = activeMenuForDateTransformer(menuServiceData, date)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData, brandData)
  const transformedCollectionRecipes = collectionRecipesTransformer(activeMenu)

  await menuLoadCollections(date, background, transformedCollections)(dispatch, getState)
  await loadRecipesForAllCollections(date, transformedRecipes, transformedCollectionRecipes)(dispatch, getState)
}

export {
  getStockAvailability,
  loadMenuCollectionsWithMenuService
}
