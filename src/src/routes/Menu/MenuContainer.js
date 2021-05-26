import { connect } from 'react-redux'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'

import Menu from './Menu'
import { menuOverlayClick } from './actions/menuOverlayClick'
import fetchData from './fetchData'
import { menuCalculateTimeToUsable } from './actions/menuCalculateTimeToUsable'

const flattenRecipes = (recipes) => {
  const recipesToJs = recipes.toJS()
  const flattenedRecipes = []

  Object.keys(recipesToJs).forEach((key) => {
    for (let i = 0; i < recipesToJs[key]; i++) {
      flattenedRecipes.push(key)
    }
  })

  return flattenedRecipes
}

function mapStateToProps(state, ownProps) {
  const query = ownProps.location && ownProps.location.query
  const showOverlay = state.boxSummaryShow.get('show') || state.menuBrowseCTAShow

  return {
    showOverlay,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    query: query || {},
    params: ownProps.params,
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(
      actionTypes.MENU_BOX_PRICES_RECEIVE,
      false
    ),
    forceLoad: state.menu.get('forceLoad', false),
    recipesCount: flattenRecipes(state.basket.get('recipes')).length,
    postcode: state.basket.get('postcode'),
    isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
  }
}

const mapDispatchToProps = {
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  menuLoadDays: actions.menuLoadDays,
  loginVisibilityChange: actions.loginVisibilityChange,
  basketNumPortionChange: actions.basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderCheckoutAction: actions.orderCheckout,
  selectCurrentCollection: actions.changeCollectionById,
  onOverlayClick: menuOverlayClick,
  boxSummaryDeliveryDaysLoad,
  menuCalculateTimeToUsable,
  fetchData
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export { flattenRecipes, MenuContainer }
