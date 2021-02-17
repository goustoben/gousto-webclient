/* eslint no-use-before-define: ["error", { "functions": false }] */
import globals from 'config/globals'
import { actionTypes } from 'actions/actionTypes'
import { getPathName } from 'middlewares/tracking/utils'
import { getWindow } from 'utils/window'
import { ResourceType } from 'routes/Menu/constants/resources'
import { getRecipesInCollection } from '../../../routes/Menu/selectors/collections'
import { getUserData } from './router'

/**
 * Send tracking data to Facebook pixel
 * @param eventName
 * @param data
 */
export const sendTrackingData = (eventName, data, trackType = 'track') => {
  getWindow().fbq(trackType, eventName, data)
}

/**
 * @param recipeId
 * @param recipes
 * @param routing
 */
export const showRecipeTracking = ({ recipeId }, { recipes, routing }) => {
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
 * @param menuCollections
 */
export const showCollectionTracking = ({ collectionName, collectionId }, { menuCollections }) => {
  const recipeIdsByCollection = getRecipesInCollection(menuCollections, collectionId)

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
export const addRecipeToBasket = ({ recipeId }, { recipes }) => {
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
export const initiateCheckout = (_, { basket }) => {
  const recipesIds = Array.from(basket.get('recipes').keys())

  sendTrackingData('InitiateCheckout', {
    content_ids: recipesIds,
    content_type: 'product',
  })
}

/**
 * New customer signup order
 * @param _
 * @param basket
 * @param menuBoxPrices
 */
export const signupPurchaseCompleted = ({ orderId }, { basket, pricing }) => {
  const recipes = basket.get('recipes')
  const recipesIds = Array.from(recipes.keys())
  const recipeCount = recipes.reduce((total, quantity) => (total + quantity), 0)
  const totalPrice = pricing.getIn(['prices', 'total'])

  sendTrackingData('Purchase', {
    content_ids: recipesIds,
    content_type: 'product',
    num_items: recipeCount,
    value: totalPrice,
    currency: 'GBP',
    order_id: orderId,
  })
}

const getV1OrderAPIKeys = (order) => {
  const recipes = order.recipeItems || []
  const recipeIds = recipes.map(recipe => recipe.recipeId)
  const recipeCount = order.box.numRecipes
  const totalPrice = order.prices.total
  const orderId = order.id.toString()

  return {
    recipeIds,
    recipeCount,
    totalPrice,
    orderId,
  }
}

const getV2OrderAPIKeys = (order) => {
  const recipes = order.data.relationships.components.data.filter((i) => i.type === ResourceType.Recipe)
  const recipeIds = recipes.map(recipe => recipe.id)
  const recipeCount = recipes.length
  const totalPrice = order.data.prices.total
  const orderId = order.data.id.toString()

  return {
    recipeIds,
    recipeCount,
    totalPrice,
    orderId,
  }
}

/**
 * Existing customer order placed
 * @param action
 */
export const customerPurchaseCompleted = ({ order }) => {
  const fn = order.data && order.data.relationships ? getV2OrderAPIKeys : getV1OrderAPIKeys
  const {
    recipeIds,
    recipeCount,
    totalPrice,
    orderId,
  } = fn(order)

  sendTrackingData('Purchase', {
    content_ids: recipeIds,
    content_type: 'product',
    num_items: recipeCount,
    value: totalPrice,
    currency: 'GBP',
    order_id: orderId,
  })
}

export const onLocationChange = (action, state, prevState, pathname) => {
  const data = getUserData(action, state, prevState, pathname)

  if (data) {
    const { fbq } = getWindow()
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

export const getCallbacks = () => ({
  [actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE]: showRecipeTracking,
  [actionTypes.FILTERS_COLLECTION_CHANGE]: showCollectionTracking,
  [actionTypes.BASKET_RECIPE_ADD]: addRecipeToBasket,
  [actionTypes.BASKET_CHECKOUT]: initiateCheckout,
  [actionTypes.CHECKOUT_SIGNUP_SUCCESS]: signupPurchaseCompleted,
  [actionTypes.__REACT_ROUTER_LOCATION_CHANGE]: onLocationChange, // eslint-disable-line no-underscore-dangle
  [actionTypes.ORDER_CREATE_TRANSACTIONAL]: customerPurchaseCompleted,
  [actionTypes.ORDER_RECIPES_CHOSEN]: customerPurchaseCompleted,
})

/**
 * Listener actions
 *
 * @param action
 * @param state
 * @param prevState
 */
export default function Tracker(action, state = {}, prevState) {
  if (globals.client && getWindow().fbq) {
    const callbacks = getCallbacks()

    if (action.type in callbacks) {
      callbacks[action.type](action, state, prevState, getPathName({ prevState }))
    }
  }
}
