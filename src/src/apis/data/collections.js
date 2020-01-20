import { fetchCollections, fetchCollectionRecipes } from 'apis/collections'

const createCollectionRecipesRequestData = (filters, idsOnly) => {
  const reqData = {
    includes: ['ingredients', 'allergens', 'taxonomy'],
    ...filters
  }

  if (idsOnly) {
    reqData['fields[]'] = 'id'
  }

  return reqData
}

export const getCollections = async (accessToken, availableOn) => {
  const reqData = {
    filters: {
      available_on: availableOn
    }
  }

  const { data } = await fetchCollections(accessToken, '', reqData)

  return data
}

export const getCollectionRecipesForMenuId = async (accessToken, collectionId, menuId, idsOnly) => {
  const reqData = createCollectionRecipesRequestData({ 'filters[menu_id]': menuId }, idsOnly)

  const { data } = await fetchCollectionRecipes(accessToken, collectionId, reqData)

  return data
}

export const getCollectionRecipesForDate = async (accessToken, collectionId, date, idsOnly) => {
  const reqData = createCollectionRecipesRequestData({ 'filters[available_on]': date }, idsOnly)

  const { data } = await fetchCollectionRecipes(accessToken, collectionId, reqData)

  return data
}
