/* eslint no-use-before-define: ["error", { "functions": false }] */
import actions from 'actions/actionTypes'
import windowUtils from 'utils/window'
import globals from 'config/globals'
import * as routerTracking from './router'
import utils from '../utils'

export const fbTracking = {
  addRecipeToBasket,
  getCallbacks,
  initiateCheckout,
  onLocationChange,
  purchaseCompleted,
  showCollectionTracking,
  showRecipeTracking,
  Tracker,
}

/**
 * Send tracking data to Facebook pixel
 * @param eventName
 * @param data
 */
function sendTrackingData(eventName, data, trackType = 'track') {
  windowUtils.getWindow().fbq(trackType, eventName, data)
}

/**
 * @param recipeId
 * @param recipes
 * @param routing
 */
function showRecipeTracking({ recipeId }, { recipes, routing }) {
  if (recipeId) {
    const urlCollection = routing.locationBeforeTransitions.query
    const collection = urlCollection.collection || 'all-recipes'
    sendTrackingData('ViewContent', {
      content_name: recipes.getIn([recipeId, 'title']),
      content_ids: [recipeId],
      content_type: 'product',
      content_category: collection,
    })
  }
}

/**
 * Whenever a collection change
 * @param collectionName
 * @param collectionId
 * @param menuCollectionRecipes
 */
function showCollectionTracking({ collectionName, collectionId }, { menuCollectionRecipes }) {
  const recipeIdsByCollection = menuCollectionRecipes.get(collectionId)

  if (recipeIdsByCollection) {
    const recipesIds = recipeIdsByCollection.toArray()
    sendTrackingData('ViewCategory', {
      content_name: collectionName,
      content_ids: recipesIds,
      content_type: 'product',
      content_category: collectionName,
    }, 'trackCustom')
  }
}

/**
 * Add recipe to basket
 * @param recipeId
 * @param recipes
 */
function addRecipeToBasket({ recipeId }, { recipes }) {
  const recipe = recipes.get(recipeId)
  if (recipe) {
    sendTrackingData('AddToCart', {
      content_name: recipe.get('title'),
      content_ids: [recipeId],
      content_type: 'product',
    })
  }
}

/**
 * Initiate checkout
 * @param _
 * @param basket
 */
function initiateCheckout(_, { basket }) {
  const recipesIds = Array.from(basket.get('recipes').keys())

  sendTrackingData('InitiateCheckout', {
    content_ids: recipesIds,
    content_type: 'product',
  })
}

/**
 * Purchase completed
 * @param _
 * @param basket
 * @param menuBoxPrices
 */
function purchaseCompleted(_, { basket, pricing }) {
  const recipes = basket.get('recipes')
  const recipesIds = Array.from(recipes.keys())
  const recipeCount = recipes.reduce((total, quantity) => (total + quantity), 0)
  const totalPrice = pricing.getIn(['prices', 'total'])
  const orderId = basket.get('previewOrderId')

  sendTrackingData('Purchase', {
    content_ids: recipesIds,
    content_type: 'product',
    num_items: recipeCount,
    value: totalPrice,
    currency: 'GBP',
    order_id: orderId,
  })
}

function onLocationChange(action, state, prevState, pathname) {
  const data = routerTracking.getUserData(action, state, prevState, pathname)

  if (data) {
    const fbq = windowUtils.getWindow().fbq
    const fbState = fbq ? fbq.getState() : {}

    if (fbState.pixels && fbState.pixels.length) {
      fbState.pixels.forEach(pixel => {
        if (!pixel.userData || !Object.keys(pixel.userData).length) {
          fbq('init', pixel.id, data, fbState.pixelInstantiationIdentifier)
        }
      })
    }
  }
}

function getCallbacks() {
  return {
    [actions.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE]: fbTracking.showRecipeTracking,
    [actions.FILTERS_COLLECTION_CHANGE]: fbTracking.showCollectionTracking,
    [actions.BASKET_RECIPE_ADD]: fbTracking.addRecipeToBasket,
    [actions.BASKET_CHECKOUT]: fbTracking.initiateCheckout,
    [actions.CHECKOUT_SIGNUP_SUCCESS]: fbTracking.purchaseCompleted,
    [actions.__REACT_ROUTER_LOCATION_CHANGE]: fbTracking.onLocationChange, // eslint-disable-line no-underscore-dangle
  }
}

/**
 * Listener actions
 *
 * @param action
 * @param state
 * @param prevState
 */
export default function Tracker(action, state = {}, prevState) {
  if (globals.client && windowUtils.getWindow().fbq) {
    const callbacks = fbTracking.getCallbacks()

    if (action.type in callbacks) {
      callbacks[action.type](action, state, prevState, utils.getPathName({ prevState }))
    }
  }
}
