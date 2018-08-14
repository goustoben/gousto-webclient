/* eslint no-use-before-define: ["error", { "functions": false }] */
import actionTypes from './actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { fetchRecipes, fetchRecipeStock, fetchAvailableDates } from 'apis/recipes'
import * as boxPricesApi from 'apis/boxPrices'
import { fetchOrder } from 'apis/orders'
import { getCutoffDateTime } from 'utils/deliveries'
import basket from './basket'
import products from './products'
import statusActions from './status'
import { collectionFilterChange } from './filters'
import { limitReached } from 'utils/basket'
import { fetchCollections, fetchCollectionRecipes } from 'apis/collections'
import logger from 'utils/logger'
import { push } from 'react-router-redux'
import { isAllRecipes, getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { isFacebookUserAgent } from 'utils/request'
import GoustoException from 'utils/GoustoException'
import { redirect } from './redirect'
import menuConfig from 'config/menu'

const menuActions = {
	menuLoadMenu,
	menuLoadBoxPrices,
	menuLoadOrderDetails,
	menuCutoffUntilReceive,
	menuClearStock,
	menuLoadStock,
	menuLoadDays,
	menuRecipeDetailVisibilityChange,
	menuFilterVegetarianChange,
	menuLoadCollections,
	menuCollectionsReceive,
	menuAddEmptyStock,
	menuBrowseCTAVisibilityChange,
	menuMobileGridViewSet,
	menuReceiveCollectionRecipes,
	menuReceiveMenu,
	menuRecieveMenuPending,
	menuLoadCollectionRecipes,
	menuLoadCollectionsRecipes,
	menuReceiveBoxPrices,
}

function menuReceiveMenu(recipes) {
	return ({
		type: actionTypes.RECIPES_RECEIVE,
		recipes,
	})
}

function menuReceiveCollectionRecipes(collectionId, recipes) {
	return ({
		type: actionTypes.MENU_COLLECTION_RECIPES_RECEIVE,
		collectionId,
		recipes,
	})
}

function menuReceiveBoxPrices(prices, tariffId) {
	return ({
		type: actionTypes.MENU_BOX_PRICES_RECEIVE,
		prices,
		tariffId,
	})
}

function menuChangeRecipeStock(stock) {
	return ({
		type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
		stock,
	})
}

function menuReplaceRecipeStock(stock) {
	return ({
		type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
		stock,
	})
}

function menuRecieveMenuPending(pending) {
	return ({
		type: actionTypes.MENU_RECIPES_RECEIVE_PENDING,
		pending,
	})
}

function findSlot(deliveryDays, coreSlotId) {
	let slotId
	deliveryDays.some(deliveryDay => {
		const matchedSlot = deliveryDay.get('slots').find(slot => {
			if (String(slot.get('coreSlotId')) === String(coreSlotId)) {
				return true
			}

			return false
		})

		if (matchedSlot) {
			slotId = matchedSlot.get('id')

			return true
		}

		return false
	})

	return slotId
}

function menuCutoffUntilReceive(cutoffUntil) {
	return {
		type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
		cutoffUntil,
	}
}

function menuLoadDays() {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.get('accessToken')
		const { data: dates = [] } = await fetchAvailableDates(accessToken)
		const availableDays = dates.pop()

		dispatch(menuActions.menuCutoffUntilReceive(availableDays.until))
	}
}

function menuCollectionsReceive(collections) {
	return {
		type: actionTypes.MENU_COLLECTIONS_RECEIVE,
		collections,
	}
}

function menuLoadCollections(date, noUrlChange) {
	return async (dispatch, getState) => {
		const state = getState()
		const accessToken = state.auth.get('accessToken')
		const args = {
			filters: {
				available_on: date,
			},
		}
		const { data: collections } = await fetchCollections(accessToken, '', args)
		const filterExperiment = state.features.getIn(['filterMenu', 'value'])
		const collectionsFiltered = filterExperiment ?
			collections.filter(collection => (!['dairy-free', 'gluten-free', 'plant-based', 'vegetarian'].includes(collection.slug)))
			:
			collections
		dispatch(menuActions.menuCollectionsReceive(collectionsFiltered))
		if (!noUrlChange) {
			let changeCollection = true
			const prevLoc = getState().routing.locationBeforeTransitions
			if (prevLoc && prevLoc.query && prevLoc.query.collection) {
				if (getCollectionIdWithName(getState(), prevLoc.query.collection)) {
					changeCollection = false
				}
			}
			const preferredCollection = Immutable.Iterable.isIterable(getState().features) ? getState().features.getIn(['preferredCollection', 'value']) : ''
			const preferredCollectionId = getCollectionIdWithName(getState(), preferredCollection)

			if (changeCollection && getState().menuCollections.size > 0) {
				let landingCollectionId = preferredCollectionId || getDefaultCollectionId(getState())
				if (!landingCollectionId) {
					landingCollectionId = getState().menuCollections.first().get('id')
				}
				collectionFilterChange(landingCollectionId)(dispatch, getState)
			}
		}
	}
}

function menuLoadCollectionRecipes(date, collectionId, idsOnly) {
	return async (dispatch, getState) => {
		const state = getState()
		const accessToken = state.auth.get('accessToken')
		const reqData = {
			'filters[available_on]': date,
			includes: ['ingredients', 'allergens', 'taxonomy'],
		}
		if (idsOnly) {
			reqData['fields[]'] = 'id'
		}
		const { data: items } = await fetchCollectionRecipes(accessToken, collectionId, reqData)
		if (items.recipes) {
			dispatch(menuActions.menuReceiveCollectionRecipes(collectionId, items.recipes))
		}
		if (!idsOnly) {
			dispatch(menuActions.menuReceiveMenu(items.recipes))
		}
	}
}

function menuLoadCollectionsRecipes(date) {
	return (dispatch, getState) => {
		const allRecipesCollections = getState().menuCollections.filter(isAllRecipes)
		const ids = Array.from(getState().menuCollections.keys())

		let allRecipesCollectionId
		if (allRecipesCollections.size > 0) {
			allRecipesCollectionId = allRecipesCollections.first().get('id')
		}

		return Promise.all(
				ids.map(id => menuLoadCollectionRecipes(date, id, id !== allRecipesCollectionId || !allRecipesCollectionId)(dispatch, getState))
			)
			.then(() => {
				const state = getState()
				const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
				dispatch({
					type: actionTypes.BASKET_LIMIT_REACHED,
					limitReached: reachedLimit,
				})
			})
	}
}

function menuLoadMenu(cutoffDateTime = null, background) {
	return async (dispatch, getState) => {
		const state = getState()
		const reqData = {
			'includes[]': ['ingredients', 'allergens'],
		}
		dispatch(menuActions.menuRecieveMenuPending(true))
		if (cutoffDateTime !== null) {
			reqData['filters[available_on]'] = cutoffDateTime
		} else {
			reqData['filters[available_on]'] = getCutoffDateTime(getState())
		}

		if (reqData['filters[available_on]']) {
			const date = reqData['filters[available_on]']
			const accessToken = getState().auth.get('accessToken')
			const features = getState().features

			const startTime = new Date()

			if (features.getIn(['collections', 'value']) || features.getIn(['forceCollections', 'value'])) {
				await menuLoadCollections(date, background)(dispatch, getState)
				await menuLoadCollectionsRecipes(date)(dispatch, getState)
			} else {
				const { data: recipes } = await fetchRecipes(accessToken, '', reqData)
				dispatch(menuActions.menuReceiveMenu(recipes))
			}

			logger.notice(`recipes fetch took ${new Date - startTime}ms`)

			dispatch(menuActions.menuRecieveMenuPending(false))

			const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
			dispatch({
				type: actionTypes.BASKET_LIMIT_REACHED,
				limitReached: reachedLimit,
			})
		} else {
			dispatch(menuActions.menuRecieveMenuPending(false))
			if (__SERVER__) {
				if (!isFacebookUserAgent(state.request.get('userAgent'))) {
					const error = new Error('Slot is not found in menuLoadMenu')
					logger.notice(error)
				}

				dispatch(redirect('/menu', true))
			}
		}
	}
}

function menuLoadBoxPrices() {
	return async (dispatch, getState) => {
		try {
			const promoCode = getState().basket.get('promoCode')
			const orderId = getState().basket.get('orderId')
			const tariffId = getState().basket.get('tariffId')
			const reqData = {}

			if (orderId) {
				reqData.order_id = orderId
			} else if (promoCode) {
				reqData.promocode = promoCode
			}

			if (!getState().auth.get('isAuthenticated') && tariffId) {
				reqData.tariff_id = tariffId
			}

			dispatch(statusActions.pending(actionTypes.MENU_BOX_PRICES_RECEIVE, true))
			dispatch(statusActions.error(actionTypes.MENU_BOX_PRICES_RECEIVE, false))

			try {
				const { data: recipePrices } = await boxPricesApi.fetchBoxPrices(getState().auth.get('accessToken'), reqData)
				dispatch(menuActions.menuReceiveBoxPrices(recipePrices, tariffId))
			} catch (err) {
				dispatch(menuActions.menuReceiveBoxPrices({}))

				throw new GoustoException(`Could not load menu box prices: fetch failed${tariffId ? ` for tariff_id "${tariffId}"` : ''}, ${err}`, {
					error: 'fetch-failed',
				})
			}
		} catch (err) {
			const errMessage = err.message || err
			logger[err.level || 'error'](errMessage)
			dispatch(statusActions.error(actionTypes.MENU_BOX_PRICES_RECEIVE, err.error || errMessage))
		} finally {
			dispatch(statusActions.pending(actionTypes.MENU_BOX_PRICES_RECEIVE, false))
		}
	}
}

function menuLoadOrderDetails(orderId) {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.get('accessToken')
		const { data: order } = await fetchOrder(accessToken, orderId, { 'includes[]': 'shipping_address' })
		dispatch(basket.basketReset())
		dispatch(menuActions.menuCutoffUntilReceive(order.whenCutoff))

		dispatch(basket.basketDateChange(order.deliveryDate))
		dispatch(basket.basketNumPortionChange(order.box.numPortions))

		order.recipeItems.forEach(recipe => {
			const qty = Math.round(parseInt(recipe.quantity, 10) / parseInt(order.box.numPortions, 10))

			const adjustedQty = menuConfig.stockThreshold + qty
			dispatch(menuChangeRecipeStock({
				[recipe.recipeId]: { [order.box.numPortions]: adjustedQty },
			}))

			for (let i = 1; i <= qty; i++) {
				dispatch(basket.basketRecipeAdd(recipe.recipeId))
			}
		})

		const productItems = order.productItems || []
		if (productItems.length) {
			const productItemIds = productItems.map(productItem => productItem.itemableId)
			await dispatch(products.productsLoadProductsById(productItemIds))
			await dispatch(products.productsLoadStock())
			await dispatch(products.productsLoadCategories())
			productItems.forEach((product) => {
				for (let i = 0; i < parseInt(product.quantity, 10); i++) {
					dispatch(basket.basketProductAdd(product.itemableId))
				}
			})
		}

		dispatch(basket.basketIdChange(order.id))
		dispatch(basket.basketOrderLoaded(order.id))

		await dispatch(basket.basketPostcodeChange(order.shippingAddress.postcode)).then(() => {
			const coreSlotId = order.deliverySlot.id
			const slotId = findSlot(getState().boxSummaryDeliveryDays, coreSlotId)
			dispatch(basket.basketSlotChange(slotId))
		})
	}
}

function menuClearStock() {
	return {
		type: actionTypes.MENU_RECIPE_STOCK_CLEAR,
	}
}

function menuLoadStock(clearStock = true) {
	return async (dispatch, getState) => {
		let dispatchMethod = menuReplaceRecipeStock
		if (!clearStock) {
			dispatchMethod = menuChangeRecipeStock
		}

		const state = getState()
		const date = state.basket.get('date')
		const coreDayId = state.boxSummaryDeliveryDays.getIn([date, 'coreDayId'], '')

		if (coreDayId) {
			const accessToken = getState().auth.get('accessToken')
			const { data: recipeStock } = await fetchRecipeStock(accessToken, coreDayId)
			const adjustedStock = Object.values(recipeStock).reduce((accumulatedStock, stockEntry) => {
				const stock = { ...accumulatedStock }
				const committed = stockEntry.committed === '1'
				stock[stockEntry.recipeId] = {
					2: committed ? parseInt(stockEntry.number, 10) : 1000,
					4: committed ? parseInt(stockEntry.familyNumber, 10) : 1000,
					committed,
				}

				return stock
			}, {})

			dispatch(dispatchMethod(adjustedStock))

			if (clearStock) {
				const numPortions = getState().basket.get('numPortions')
				getState().basket.get('recipes', Immutable.Map({})).forEach((amount, recipeId) => {
					for (let x = 0; x < amount; x++) {
						dispatch({
							type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
							stock: { [recipeId]: { [numPortions]: -1 } },
						})
					}
				})
			}
		}
	}
}

function menuRecipeDetailVisibilityChange(recipeId) {
	return (dispatch, getState) => {
		dispatch({
			type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
			recipeId,
			trackingData: {
				actionType: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
				recipeId: recipeId || getState().menuRecipeDetailShow,
				show: !!recipeId,
			},
		})
		const prevLoc = getState().routing.locationBeforeTransitions
		const query = { ...prevLoc.query }
		delete query.recipeDetailId

		if (recipeId) {
			query.recipeDetailId = recipeId
			const newLoc = { ...prevLoc, query }
			dispatch(push(newLoc))
		} else {
			const newLoc = { ...prevLoc, query }
			dispatch(push(newLoc))
		}
	}
}

function menuFilterVegetarianChange(filter) {
	return {
		type: actionTypes.MENU_FILTER_VEGETARIAN,
		filter,
	}
}

function menuAddEmptyStock() {
	return (dispatch, getState) => {
		const recipesIds = getState().menuRecipes
		const stocks = recipesIds.reduce((stock, recipeId) => ({ ...stock, [recipeId]: { 2: null, 4: null } }), {})

		dispatch({
			type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
			stock: stocks,
		})
	}
}

function menuBrowseCTAVisibilityChange(show) {
	return {
		type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
		show,
	}
}

function menuMobileGridViewSet(from, to) {
	return {
		type: actionTypes.MENU_MOBILE_GRID_VIEW_SET,
		trackingData: {
			actionType: actionTypes.MENU_MOBILE_GRID_VIEW_SET,
			from,
			to,
		},
	}
}

export default menuActions
