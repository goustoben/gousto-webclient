import menuFetchData from 'routes/Menu/fetchData'
import { getMenuService, getUserMenuVariant } from 'selectors/features'

export const loadMenuServiceDataIfDeepLinked = async (store, isSignUpPage) => {
  const useMenuService = getMenuService()

  if (store) {
    const menuServiceData = store.getState().menuService
    const userMenuVariant = getUserMenuVariant(store.getState())

    const hasNoMenuDataAlready = useMenuService && (!menuServiceData || !menuServiceData.data || !menuServiceData.data.length)
    const mustLoadVariantMenu = isSignUpPage && userMenuVariant
    const shouldForce = mustLoadVariantMenu ? true : false

    if (mustLoadVariantMenu || hasNoMenuDataAlready) {
      await menuFetchData({ store, query: {}, params: {} }, shouldForce, true, userMenuVariant)
    } 
  }
}
