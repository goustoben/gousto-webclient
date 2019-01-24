import Immutable from 'immutable' /* eslint-disable new-cap */
import { connect } from 'react-redux'

import actions from 'actions'
import { slugify } from 'utils/url'
import actionTypes from 'actions/actionTypes'
import { triggerMenuLoad } from 'actions/menu'
import { getFilteredRecipeIds } from './selectors/filters.js'
import { getCurrentCollectionIsRecommendation } from './selectors/menu'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'

import Menu from './Menu'

function mapStateToProps(state, ownProps) {
  function getBasketRecipes(recipes) {
    return Array.from(recipes.keys())
  }

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

  return {
    basketRecipeIds: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))),
    menuRecipeDetailShow: (ownProps.location && ownProps.location.query) ? ownProps.location.query.recipeDetailId : '',
    boxSummaryShow: state.boxSummaryShow.get('show'),
    menuCurrentCollectionId: collectionId,
    menuCollectionRecipes: state.menuCollectionRecipes,
    features: state.features,
    menuBrowseCTAShow: state.menuBrowseCTAShow,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    hasRecommendations: state.features.getIn(['justforyou_v2', 'value']),
    query: ownProps.location && ownProps.location.query ? ownProps.location.query : {},
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
    numPortions: state.basket.get('numPortions')
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
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default MenuContainer
