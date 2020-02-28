import { connect } from 'react-redux'
import { changeCollectionById } from 'actions/filters'
import { menuRecipeDetailVisibilityChange } from 'actions/menu'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { getShowStockAlertFlag, getShowNewMenuLayout } from 'selectors/features'
import { getRecipes } from 'selectors/root'

import { MenuRecipesPage } from './MenuRecipesPage'
import { getCollectionId } from './utils/getCollectionId'

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

  const collectionId = getCollectionId(state, query)

  return ({
    stateRecipeCount: getRecipes(state).size,
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
    menuCurrentCollectionId: collectionId,
    showLoading: showLoading(state),
    orderId: params.orderId,
    storeOrderId: state.basket.get('orderId'),
    numPortions: state.basket.get('numPortions'),
    showStockAlert: getShowStockAlertFlag(state),
    newMenuLayout: getShowNewMenuLayout(state)
  })
}

const mapDispatchToProps = {
  shouldJfyTutorialBeVisible,
  selectCurrentCollection: changeCollectionById,
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  basketOrderLoaded: actions.basketOrderLoaded,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
}

const MenuRecipesPageContainer = connect(mapStateToProps, mapDispatchToProps)(MenuRecipesPage)

export { MenuRecipesPageContainer }
