import { connect } from 'react-redux'
import { changeCollectionById } from 'actions/filters'
import actions from 'actions'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import {
  getIsSignupReductionEnabled,
  getIsCommunicationPanelEnabled,
  getIsTastePreferencesEnabled
} from 'selectors/features'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'
import { getIsAuthenticated } from 'selectors/auth'
import { userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getLoadingStateForOrder, getUserId } from 'selectors/user'
import { getBrowserType } from 'selectors/browser'
import { menuRecipeDetailVisibilityChange, checkQueryParams } from '../actions/menuRecipeDetails'
import { loadOptimizelySDK } from '../../../actions/optimizely'

import { MenuRecipesPage } from './MenuRecipesPage'
import { getCurrentCollectionId } from '../selectors/collections'
import { isMenuLoading } from '../selectors/menu'

const mapStateToProps = (state, ownProps) => {
  const {
    params,
    location: { query }
  } = ownProps

  const collectionId = getCurrentCollectionId(state)

  return ({
    showTastePreferencesLoading: getIsTastePreferencesEnabled(state),
    stateRecipeCount: getRecipes(state).size,
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
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
    browserType: getBrowserType(state),
    query: query || {},
  })
}

const mapDispatchToProps = {
  checkQueryParams,
  shouldJfyTutorialBeVisible,
  selectCurrentCollection: changeCollectionById,
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  basketOrderLoaded: actions.basketOrderLoaded,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  loadOptimizelySDK,
}

const MenuRecipesPageContainer = connect(mapStateToProps, mapDispatchToProps)(MenuRecipesPage)

export { MenuRecipesPageContainer }
