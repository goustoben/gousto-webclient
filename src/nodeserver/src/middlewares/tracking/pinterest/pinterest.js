/* eslint no-use-before-define: ["error", { "functions": false }] */
import Immutable from 'immutable'
import actions from 'actions/actionTypes'
import windowUtils from 'utils/window'
import globals from 'config/globals'
import utils from '../utils'

export const pinterestTracking = {
	addRecipeToBasket,
	showCollectionTracking,
	initiateCheckout,
	purchaseCompleted,
	pageVisit,
	getCallbacks,
	Tracker,
}

/**
 * Send tracking data to Facebook pixel
 * @param eventName
 * @param data
 */
function sendTrackingData(eventName, data, trackType = 'track') {
	windowUtils.getWindow().pintrk(trackType, eventName, data)
}

/**
 * Add recipe to basket
 * @param recipeId
 */
function addRecipeToBasket({ recipeId }) {
	sendTrackingData('AddToCart', {
		value: parseInt(recipeId, 10),
	})
}

/**
 * Whenever a collection change
 * @param collectionId
 */
function showCollectionTracking({ collectionId }) {
	sendTrackingData('ViewCategory', {
		product_category: collectionId,
	})
}

/**
 * Initiate checkout
 * @param basket
 */
function initiateCheckout(_, { basket }) {
	const recipesIds = Array.from(basket.get('recipes').keys())

	sendTrackingData('InitiateCheckout', {
		property: recipesIds,
	})
}

/**
 * Purchase completed
 * @param _
 * @param basket
 * @param menuBoxPrices
 */
function purchaseCompleted(_, { basket, menuBoxPrices }) {
	const portions = basket.get('numPortions')
	const recipes = basket.get('recipes')
	const promocode = basket.get('promoCode')
	const recipeCount = recipes.reduce((total, quantity) => (total + quantity), 0)
	const boxPrice = menuBoxPrices.getIn([String(portions), String(recipeCount)], Immutable.Map())
	const lineItems = Array.from(basket.get('recipes').keys()).map((recipeId) => ({ product_id: parseInt(recipeId, 10), product_quantity: Immutable.Iterable.isIterable(recipes) ? recipes.get(recipeId) : null }))
	sendTrackingData('Signup', {
		value: parseFloat(boxPrice.getIn(['gourmet', 'grossTotal'])),
		order_quantity: recipeCount,
		currency: 'GBP',
		promo_code: promocode,
		line_items: lineItems,
	})
}

/**
 * Page change
 * @param action
 * @param state
 */
function pageVisit(action, state) {
	sendTrackingData('PageVisit', {
		property: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname,
	})
}

function getCallbacks() {
	return {
		[actions.FILTERS_COLLECTION_CHANGE]: pinterestTracking.showCollectionTracking,
		[actions.BASKET_RECIPE_ADD]: pinterestTracking.addRecipeToBasket,
		[actions.BASKET_CHECKOUT]: pinterestTracking.initiateCheckout,
		[actions.CHECKOUT_SIGNUP_SUCCESS]: pinterestTracking.purchaseCompleted,
		[actions.__REACT_ROUTER_LOCATION_CHANGE]: pinterestTracking.pageVisit, // eslint-disable-line no-underscore-dangle
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
	if (globals.client && windowUtils.getWindow().pintrk) {
		const callbacks = pinterestTracking.getCallbacks()

		if (action.type in callbacks) {
			callbacks[action.type](action, state, prevState, utils.getPathName({ prevState }))
		}
	}
}
