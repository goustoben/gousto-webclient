import { activeMenuForDateTransformer } from 'apis/transformers/activeMenuForDate'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { collectionRecipesTransformer } from 'apis/transformers/collectionRecipes'
import { menuLoadCollections, menuLoadCollectionsRecipes } from 'actions/menuCollections'

function getStockAvailability(getState, recipeStock) {
  const includedData = getState().recipes
  const storedRecipes = Object.values(includedData.toJS())
  const recipeStockList = Object.values(recipeStock)

  return recipeStockList.reduce((acc, stockEntry) => {
    const committed = stockEntry.committed === '1'

    const newId = storedRecipes.find((obj) => {
      return obj.coreRecipeId === stockEntry.recipeId.toString()
    }).id

    acc[newId] = {
      2: committed ? parseInt(stockEntry.number, 10) : 1000,
      4: committed ? parseInt(stockEntry.familyNumber, 10) : 1000,
      committed,
    }

    return acc
  }, {})
}

const loadMenuCollectionsWithMenuService = async (getState, dispatch, date, background) => {
  const menuServiceData = getState().menuService.toJS()
  const activeMenu = activeMenuForDateTransformer(menuServiceData, date)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData)
  const transformedCollectionRecipes = collectionRecipesTransformer(activeMenu)

  await menuLoadCollections(date, background, transformedCollections)(dispatch, getState)
  await menuLoadCollectionsRecipes(date, transformedRecipes, transformedCollectionRecipes)(dispatch, getState)
}

export {
  getStockAvailability,
  loadMenuCollectionsWithMenuService
}
