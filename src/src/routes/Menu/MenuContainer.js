import Immutable from 'immutable' /* eslint-disable new-cap */
import { connect } from 'react-redux'
import moment from 'moment'

import actions from 'actions'
import { getSlot } from 'utils/deliveries'
import { slugify } from 'utils/url'
import actionTypes from 'actions/actionTypes'
import { triggerMenuLoad } from 'actions/menu'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'

import { getJfyTutorial } from 'selectors/features'
import { getFoodBrandFilter, getFoodBrandDetails } from 'selectors/filters'
import { getFilteredRecipeIds } from './selectors/filters'
import { getCurrentCollectionIsRecommendation } from './selectors/menu'

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
    for(let i = 0; i < recipesToJs[key]; i++) {
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
  let collectionName = (ownProps.location && ownProps.location.query) ? ownProps.location.query.collection : ''
  const preferredCollectionName = state.features.getIn(['preferredCollection', 'value'])

  if (!state.features.getIn(['forceCollections', 'value'])) {
    const featureCollectionFreeze = state.features.getIn(['collectionFreeze', 'value'])
    if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
      collectionName = featureCollectionFreeze
    }
  }

  if (!collectionName && preferredCollectionName) {
    state.menuCollections.keySeq().toArray().forEach((id) => {
      if (slugify(state.menuCollections.getIn([id, 'shortTitle'], '')) === preferredCollectionName) {
        collectionName = preferredCollectionName
      }
    })
  }

  let collectionId = getCollectionIdWithName(state, collectionName)
  if (!collectionId) {
    if (getCurrentCollectionIsRecommendation(state)) {
      collectionId = getCurrentCollectionIsRecommendation(state)
    } else {
      collectionId = getDefaultCollectionId(state)
    }
  }

  const orderId = (ownProps.params && ownProps.params.orderId) ? ownProps.params.orderId : ''
  const query = ownProps.location && ownProps.location.query

  return {
    foodBrandSelected: getFoodBrandFilter(state),
    basketRecipeIds: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))),
    basketProducts: getBasketProducts(state.basket.get('products', Immutable.Map({}))),
    cutOffDate: getCutoffDate(state.basket.get('date')),
    menuRecipeDetailShow: (query) ? ownProps.location.query.recipeDetailId : '',
    boxSummaryShow: state.boxSummaryShow.get('show'),
    menuCurrentCollectionId: collectionId,
    menuCollectionRecipes: state.menuCollectionRecipes,
    features: state.features,
    menuBrowseCTAShow: state.menuBrowseCTAShow,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    hasRecommendations: state.features.getIn(['justforyou_v2', 'value']),
    query: query ? ownProps.location.query : {},
    storeOrderId: state.basket.get('orderId'),
    orderId,
    isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    menuVariation: state.features.getIn(['menuRecipes', 'value']),
    filteredRecipesNumber: getFilteredRecipeIds(state).size,
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
  clearAllFilters: actions.clearAllFilters,
  triggerMenuLoad,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  basketNumPortionChange: actions.basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderHasAnyProducts: actions.orderHasAnyProducts,
  orderUpdateProducts: actions.orderUpdateProducts,
  productsLoadProducts: actions.productsLoadProducts,
  productsLoadStock: actions.productsLoadStock,
  orderCheckoutAction: actions.orderCheckout,
  selectFoodBrand: actions.selectFoodBrand,
  selectCurrentCollection: actions.changeCollectionById
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default MenuContainer

export {
  flattenRecipes,
  getCutoffDate
}
