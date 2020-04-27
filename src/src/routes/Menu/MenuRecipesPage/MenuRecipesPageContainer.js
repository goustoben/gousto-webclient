import { connect } from 'react-redux'
import { changeCollectionById } from 'actions/filters'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { getIsSignupReductionEnabled, getIsCommunicationPanelEnabled } from 'selectors/features'
import { getRecipes } from 'selectors/root'
import { getIsAuthenticated } from 'selectors/auth'
import { menuRecipeDetailVisibilityChange, checkQueryParams } from '../actions/menuRecipeDetails'

import { MenuRecipesPage } from './MenuRecipesPage'
import { getCurrentCollectionId } from '../selectors/collections'

const showLoading = (state) => {
  const boxSummaryShow = state.boxSummaryShow.get('show')
  const { menuBrowseCTAShow } = state
  const isLoading = state.pending.get(actionTypes.MENU_FETCH_DATA, false)
  const overlayShow = boxSummaryShow || menuBrowseCTAShow
  const forceLoad = state.menu.get('forceLoad', false)

  return isLoading && !overlayShow || forceLoad
}

const mapStateToProps = (state, ownProps) => {
  const {
    params,
    location: { query }
  } = ownProps

  const collectionId = getCurrentCollectionId(state)

  return ({
    stateRecipeCount: getRecipes(state).size,
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
    menuCurrentCollectionId: collectionId,
    showLoading: showLoading(state),
    orderId: params.orderId,
    storeOrderId: state.basket.get('orderId'),
    numPortions: state.basket.get('numPortions'),
    isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
    showCommunicationPanel: getIsCommunicationPanelEnabled(state) && !!getIsAuthenticated(state)
  })
}

const mapDispatchToProps = {
  checkQueryParams,
  shouldJfyTutorialBeVisible,
  selectCurrentCollection: changeCollectionById,
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  basketOrderLoaded: actions.basketOrderLoaded,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
}

const MenuRecipesPageContainer = connect(mapStateToProps, mapDispatchToProps)(MenuRecipesPage)

export { MenuRecipesPageContainer }
