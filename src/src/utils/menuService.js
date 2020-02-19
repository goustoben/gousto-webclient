import menuFetchData from 'routes/Menu/fetchData'
import { getUserMenuVariant } from 'selectors/features'

export const loadMenuServiceDataIfDeepLinked = async (store, isSignUpPage) => {
  if (store) {
    const menuServiceData = store.getState().menuService
    const userMenuVariant = getUserMenuVariant(store.getState())

    const hasNoMenuDataAlready = !menuServiceData || !menuServiceData.data || !menuServiceData.data.length
    const mustLoadVariantMenu = isSignUpPage && userMenuVariant
    const shouldForce = !!mustLoadVariantMenu

    if (mustLoadVariantMenu || hasNoMenuDataAlready) {
      await menuFetchData({ store, query: {}, params: {} }, shouldForce, true, userMenuVariant)
    }
  }
}
