import Immutable from 'immutable'
import { connect } from 'react-redux'
import moment from 'moment'

import actions from 'actions'
import { getSlot } from 'utils/deliveries'
import actionTypes from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'

import { getJfyTutorial } from 'selectors/features'
import { getRecipeGroupFilter, getFoodBrandDetails } from 'selectors/filters'

import Menu from './Menu'

function getCoreSlotId(deliveryDays, date, slotId) {
  const slot = getSlot(deliveryDays, date, slotId)
  let coreSlotId = ''
  if (slot) {
    coreSlotId = slot.get('coreSlotId', '')
  }

  return coreSlotId
}

function getBasketRecipes(recipes) {
  return Array.from(recipes.keys())
}

const getBasketProducts = products => {
  return products.entrySeq().map(([id, quantity]) => (
    { id, quantity }
  ))
}

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

const getCutoffDate = (deliveryDate) => {
  const CUTTOFF_DAY = 3

  if (!deliveryDate) {
    return ''
  }

  return moment(deliveryDate)
    .subtract(CUTTOFF_DAY, 'days')
    .format('DD-MM-YYYY h:mm:ss')
}

function mapStateToProps(state, ownProps) {
  const orderId = (ownProps.params && ownProps.params.orderId) ? ownProps.params.orderId : ''
  const query = ownProps.location && ownProps.location.query

  return {
    recipeGroupingSelected: getRecipeGroupFilter(state),
    basketRecipeIds: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))),
    basketProducts: getBasketProducts(state.basket.get('products', Immutable.Map({}))),
    cutOffDate: getCutoffDate(state.basket.get('date')),
    boxSummaryShow: state.boxSummaryShow.get('show'),
    menuCollectionRecipes: state.menuCollectionRecipes,
    menuBrowseCTAShow: state.menuBrowseCTAShow,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    query: query || {},
    params: ownProps.params,
    storeOrderId: state.basket.get('orderId'),
    orderId,
    isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    menuVariation: state.features.getIn(['menuRecipes', 'value']),
    forceLoad: state.menu.get('forceLoad', false),
    numPortions: state.basket.get('numPortions'),
    jfyTutorialFlag: getJfyTutorial(state),
    recipes: flattenRecipes(state.basket.get('recipes')),
    promoCode: state.basket.get('promoCode'),
    postcode: state.basket.get('postcode'),
    userOrders: state.user.get('orders', Immutable.List([])),
    slotId: getCoreSlotId(
      state.boxSummaryDeliveryDays,
      state.basket.get('date'),
      state.basket.get('slotId')
    ),
    deliveryDayId: state.boxSummaryDeliveryDays.getIn(
      [state.basket.get('date'), 'coreDayId']
    ),
    addressId: state.basket.getIn(['address', 'id'], ''),
    foodBrandDetails: (query && query.foodBrand) ? getFoodBrandDetails(state) : null
  }
}

const mapDispatchToProps = {
  basketOrderLoaded: actions.basketOrderLoaded,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  detailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
  menuMobileGridViewSet: actions.menuMobileGridViewSet,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryDeliveryDaysLoad: actions.boxSummaryDeliveryDaysLoad,
  menuLoadDays: actions.menuLoadDays,
  loginVisibilityChange: actions.loginVisibilityChange,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  basketNumPortionChange: actions.basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderHasAnyProducts: actions.orderHasAnyProducts,
  orderUpdateProducts: actions.orderUpdateProducts,
  productsLoadProducts: actions.productsLoadProducts,
  productsLoadStock: actions.productsLoadStock,
  orderCheckoutAction: actions.orderCheckout,
  filterRecipeGrouping: actions.filterRecipeGrouping,
  selectCurrentCollection: actions.changeCollectionById,
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export {
  flattenRecipes,
  getCutoffDate
}

export default MenuContainer
