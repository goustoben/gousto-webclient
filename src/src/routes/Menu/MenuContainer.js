import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'

import Menu from './Menu'
import fetchData from './fetchData'
import { menuCalculateTimeToUsable } from './actions/menuCalculateTimeToUsable/menuCalculateTimeToUsable'
import { boxSummaryDeliveryDaysLoad } from "actions/boxSummary/boxSummaryDeliveryDaysLoad"
import { applyPromoCodeAndShowModal } from "actions/home/applyPromoCodeAndShowModal"
import { shouldJfyTutorialBeVisible } from "actions/tutorial/shouldJfyTutorialBeVisible"
import { menuLoadBoxPrices } from "actions/menu/menuLoadBoxPrices"
import { menuLoadDays } from "actions/menu/menuLoadDays"
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { orderCheckout } from "actions/order/orderCheckout"
import { changeCollectionById } from "actions/filters/changeCollectionById"
import { menuOverlayClick } from "routes/Menu/actions/menuOverlayClick/menuOverlayClick"

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
  menuLoadBoxPrices,
  menuLoadDays,
  loginVisibilityChange,
  basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderCheckoutAction: orderCheckout,
  selectCurrentCollection: changeCollectionById,
  onOverlayClick: menuOverlayClick,
  boxSummaryDeliveryDaysLoad,
  menuCalculateTimeToUsable,
  fetchData,
  applyPromoCodeAndShowModal
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export { flattenRecipes, MenuContainer }
