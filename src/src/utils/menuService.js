import menuFetchData from 'routes/Menu/fetchData'
import { getMenuService } from 'selectors/features'

export const loadMenuServiceDataIfDeepLinked = async (store) => {
  const useMenuService = getMenuService()

  if (store) {
    const menuServiceData = store.getState().menuService
    if (useMenuService && (!menuServiceData || !menuServiceData.data || !menuServiceData.data.length)) {
      await menuFetchData({ store, query: {}, params: {} }, false, true)
    }
  }
}
