import { getUserMenuVariant } from 'selectors/features'

import menuFetchData from './fetchData'

export const loadMenuServiceDataIfDeepLinked =
  (isSignUpPage, addRecipe) => async (dispatch, getState) => {
    const state = getState()
    const menuServiceData = state.menuService
    const userMenuVariant = getUserMenuVariant(state)

    const hasNoMenuDataAlready =
      !menuServiceData || !menuServiceData.data || !menuServiceData.data.length
    const mustLoadVariantMenu = isSignUpPage && userMenuVariant
    const shouldForce = !!mustLoadVariantMenu

    if (mustLoadVariantMenu || hasNoMenuDataAlready) {
      await dispatch(
        menuFetchData({ query: {}, params: {} }, shouldForce, true, userMenuVariant, { addRecipe }),
      )
    }
  }
