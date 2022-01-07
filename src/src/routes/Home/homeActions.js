import { getAccessToken } from 'selectors/auth'
import { fetchMenus } from 'routes/Menu/fetchData/menuApi'
import { menuServiceDataReceived } from 'actions/menuService'
import { activeMenuForDate } from 'routes/Menu/selectors/menu'
import { collectionsTransformer } from 'apis/transformers/collections'
import { recipesTransformer } from 'apis/transformers/recipes'
import { menuCollectionsReceive, menuReceiveMenu } from 'actions/menuActionHelper'

export const fetchMenuForCarousel = () => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())
  const query = {}
  const menuResponse = await fetchMenus(accessToken, query)

  await dispatch(menuServiceDataReceived(menuResponse, accessToken))

  const menuServiceData = getState().menuService

  const activeMenu = activeMenuForDate(menuServiceData)
  const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
  const transformedRecipes = recipesTransformer(activeMenu, menuServiceData)

  dispatch(menuCollectionsReceive(transformedCollections))
  dispatch(menuReceiveMenu(transformedRecipes))
}
