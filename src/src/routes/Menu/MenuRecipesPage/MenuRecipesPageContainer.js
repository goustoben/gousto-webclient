import { connect } from 'react-redux'
import { changeCollectionById } from 'actions/filters'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
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
import { menuRecipeDetailVisibilityChange, checkQueryParams } from '../actions/menuRecipeDetails'
import { loadOptimizelySDK } from '../../../actions/optimizely'

import { MenuRecipesPage } from './MenuRecipesPage'
import { getCurrentCollectionId } from '../selectors/collections'

const showLoading = (state) => {
  const boxSummaryShow = state.boxSummaryShow.get('show')
  const { menuBrowseCTAShow } = state
  const isMenuLoading = state.pending.get(actionTypes.MENU_FETCH_DATA, false)
  const isOptimizelyLoading = state.pending.get(actionTypes.OPTIMIZELY_ROLLOUT_LOADING, false)
  const overlayShow = boxSummaryShow || menuBrowseCTAShow
  const forceLoad = state.menu.get('forceLoad', false)

  return ((isMenuLoading || isOptimizelyLoading) && !overlayShow) || forceLoad
}

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
    showLoading: showLoading(state),
    orderId: params.orderId,
    storeOrderId: state.basket.get('orderId'),
    numPortions: state.basket.get('numPortions'),
    isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
    showCommunicationPanel: getIsCommunicationPanelEnabled(state) && !!getIsAuthenticated(state),
    userId: getUserId(state),
    shouldShowCapacityInfo: !userHasAvailableSlots(state) && getBoxSummaryDeliveryDays(state).size > 0 && (!getLoadingStateForOrder(state) || !getIsAuthenticated(state))
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
