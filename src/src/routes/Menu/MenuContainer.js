import { connect } from 'react-redux'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { getOneOffSlotAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getLoadingStateForOrder, getUserOpenOrders } from 'selectors/user'

import Menu from './Menu'
import { menuOverlayClick } from './actions/menuOverlayClick'

const flattenRecipes = (recipes) => {
  const recipesToJs = recipes.toJS()
  const flattenedRecipes = []

  Object.keys(recipesToJs).forEach(key => {
    for (let i = 0; i < recipesToJs[key]; i++) {
      flattenedRecipes.push(key)
    }
  })

  return flattenedRecipes
}

function mapStateToProps(state, ownProps) {
  const query = ownProps.location && ownProps.location.query

  const showOverlay = state.boxSummaryShow.get('show') || state.menuBrowseCTAShow
  const userOpenOrders = getUserOpenOrders(state)
  const oneOffSlotAvailableSlots = getOneOffSlotAvailableSlots(state)

  const userHasAvailableSlots = userOpenOrders.size > 0 || oneOffSlotAvailableSlots.size > 0

  return {
    showOverlay,
    menuCollectionRecipes: state.menuCollectionRecipes,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    query: query || {},
    params: ownProps.params,
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    forceLoad: state.menu.get('forceLoad', false),
    recipesCount: flattenRecipes(state.basket.get('recipes')).length,
    postcode: state.basket.get('postcode'),
    userHasAvailableSlots,
    userOrderLoadingState: getLoadingStateForOrder(state),
  }
}

const mapDispatchToProps = {
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  menuLoadDays: actions.menuLoadDays,
  loginVisibilityChange: actions.loginVisibilityChange,
  basketNumPortionChange: actions.basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderHasAnyProducts: actions.orderHasAnyProducts,
  orderUpdateProducts: actions.orderUpdateProducts,
  orderCheckoutAction: actions.orderCheckout,
  selectCurrentCollection: actions.changeCollectionById,
  onOverlayClick: menuOverlayClick,
  boxSummaryDeliveryDaysLoad,
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export {
  flattenRecipes,
  MenuContainer
}
