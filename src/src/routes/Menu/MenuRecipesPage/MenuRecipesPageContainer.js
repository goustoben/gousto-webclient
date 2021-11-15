import { connect } from 'react-redux'
import {
  getIsCommunicationPanelEnabled,
  getIsSignupReductionEnabled,
  getIsTastePreferencesEnabled
} from 'selectors/features'
import { getBoxSummaryDeliveryDays, getRecipes } from 'selectors/root'
import { getIsAuthenticated } from 'selectors/auth'
import { userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getLoadingStateForOrder, getUserId } from 'selectors/user'

import { MenuRecipesPage } from './MenuRecipesPage'
import { getCurrentCollectionId } from '../selectors/collections'
import { isMenuLoading } from '../selectors/menu'
import fetchData from '../fetchData'
import { changeCollectionById } from "actions/filters/changeCollectionById"
import { loadOptimizelySDK } from "actions/optimizely/loadOptimizelySDK"
import { shouldJfyTutorialBeVisible } from "actions/tutorial/shouldJfyTutorialBeVisible"
import { basketOrderLoaded } from "actions/basket/basketOrderLoaded"
import { portionSizeSelectedTracking } from "actions/basket/portionSizeSelectedTracking"
import { checkQueryParams } from "routes/Menu/actions/menuRecipeDetails/checkQueryParams"

const mapStateToProps = (state, ownProps) => {
  const {
    params,
    location: { query }
  } = ownProps

  const collectionId = getCurrentCollectionId(state)

  return ({
    showTastePreferencesLoading: getIsTastePreferencesEnabled(state),
    stateRecipeCount: getRecipes(state).size,
    menuCurrentCollectionId: collectionId,
    showLoading: isMenuLoading(state),
    orderId: params.orderId,
    storeOrderId: state.basket.get('orderId'),
    numPortions: state.basket.get('numPortions'),
    isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
    showCommunicationPanel: getIsCommunicationPanelEnabled(state) && !!getIsAuthenticated(state),
    userId: getUserId(state),
    shouldShowCapacityInfo: !userHasAvailableSlots(state) && getBoxSummaryDeliveryDays(state).size > 0 && (!getLoadingStateForOrder(state) || !getIsAuthenticated(state)),
    menuLoadingErrorMessage: state.menu.get('menuLoadingErrorMessage'),
    query: query || {},
  })
}

const mapDispatchToProps = {
  checkQueryParams,
  shouldJfyTutorialBeVisible,
  selectCurrentCollection: changeCollectionById,
  basketOrderLoaded,
  portionSizeSelectedTracking,
  loadOptimizelySDK,
  fetchMenuData: fetchData,
}

const MenuRecipesPageContainer = connect(mapStateToProps, mapDispatchToProps)(MenuRecipesPage)

export { MenuRecipesPageContainer }
