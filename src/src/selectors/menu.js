import { getIsWizardPricePerServingEnabled } from './features'

export const getMenuAccessToken = ({ menu }) => menu.get('accessToken')
export const getMenuFetchVariant = ({ menu }) => menu.get('menuVariant')
export const getMenuLimits = ({ menu }) => menu.get('menuLimits')
export const getCurrentExpandedRecipeVariantsDropdown = ({ menu }) => menu.get('currentExpandedRecipeVariantsDropdown')

export const shouldUseWizardPricePerServing = (state) => (
  state.routing.locationBeforeTransitions.pathname.indexOf('box-size') !== -1
  && getIsWizardPricePerServingEnabled(state)
)
