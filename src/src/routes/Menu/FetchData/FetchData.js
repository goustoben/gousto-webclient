import actions from 'actions'
import logger from 'utils/logger'

import actionTypes from 'actions/actionTypes'

import { loadRecommendations } from 'actions/recipes'
import { getLandingDay, cutoffDateTimeNow } from 'utils/deliveries'
import { isFacebookUserAgent } from 'utils/request'

import { selectCollection, shouldPreselectCollection } from 'utils/collections'

// import moment from 'moment'

export default async function FetchData({ store, query, params }, force, background) {
	const isAuthenticated = store.getState().auth.get('isAuthenticated')
	const isAdmin = store.getState().auth.get('isAdmin')
	function chooseFirstDate() {
		return (
			Promise.all([
				isAuthenticated && !isAdmin ? store.dispatch(actions.userLoadOrders()) : null,
				store.dispatch(actions.menuLoadDays())
					.then(() => store.dispatch(actions.boxSummaryDeliveryDaysLoad())),
			])
				.then(() => {
					const state = store.getState()
					const canLandOnOrder = store.getState().features.getIn(['landingOrder', 'value'], false)
					const { date } = getLandingDay(
						state,
						false,
						!canLandOnOrder,
					)

					return store.dispatch(actions.basketDateChange(date))
				})
		)
	}

	function requiresMenuRecipesClear() {
		return params.orderId && isAuthenticated && store.getState().basket.get('recipes').size && store.getState().features.getIn(['menuRecipes', 'experiment'])
	}

	/*
	* TODO: remove forceCollections feature checks
	* once something becomes default behavior, we should update the code rather than continue to drive it by feature flags
	*/
	if (isAuthenticated && !store.getState().features.getIn(['forceCollections', 'value'])) {
		store.dispatch(actions.featureSet('forceCollections', true))
	}

	if (isAuthenticated && !store.getState().features.getIn(['justforyou', 'value'])) {
		store.dispatch(loadRecommendations())
	}

	let fetchDataPromise
	// const menuRecipes = store && store.getState().menuRecipes
	// const threshold = (__DEV__) ? 4 : 8
	// const stale = moment(store.getState().menuRecipesUpdatedAt).add(1, 'hour').isBefore(moment())
	const shouldFetch =  true // force || !menuRecipes || (menuRecipes && menuRecipes.size <= threshold) || stale || requiresMenuRecipesClear()
	const isPending = store && store.getState().pending && store.getState().pending.get(actionTypes.MENU_FETCH_DATA)
	console.log('should fetch', shouldFetch)
	if (!isPending && shouldFetch) {
		store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, true))

		const disableBrowseMode = store.getState().features.getIn(['browse', 'value']) === false || store.getState().auth.get('isAuthenticated')
		let promises

		if (query.error) {
			store.dispatch(actions.error(actionTypes.ORDER_SAVE, query.error))
			if (query.error === 'no-stock') {
				await store.dispatch(actions.menuLoadStock(true))
			}
		}

		if (params.orderId) {
			const prevBasketRecipes = store.getState().basket.get('recipes')

			if (isAuthenticated) {
				const promiseAllQueries = [
					[actions.menuLoadMenu, null],
					[actions.menuLoadStock, true],
				]
				promises = store.dispatch(actions.menuLoadOrderDetails(params.orderId))
					.then(() => {
						const noOfOrderRecipes = store.getState().basket.get('recipes').size
						if (noOfOrderRecipes === 0) {
							prevBasketRecipes.forEach((qty, recipeId) => {
								for (let i = 0; i < qty; i++) {
									store.dispatch(actions.basketRecipeAdd(recipeId))
								}
							})
						}
					})
					.then(() => {
						if (requiresMenuRecipesClear()) {
							store.dispatch(actions.featureSet('menuRecipes', undefined, false))
						}

						return Promise.all(promiseAllQueries.map(promiseAction => (
							store.dispatch(promiseAction[0].call(null, promiseAction[1]))
						)))
					})
					.catch(err => {
						logger.error(`Debug fetchData: ${err}`)
						if (__SERVER__) {
							logger.error(`Failed to fetch order: ${params.orderId}.`, err)
							store.dispatch(actions.redirect('/menu', true))
						}
					})
			} else {
				if (__SERVER__) {
					if (!isFacebookUserAgent(store.getState().request.get('userAgent'))) {
						logger.notice(`Unauthenticated user trying to edit: ${params.orderId}`)
					}
					store.dispatch(actions.redirect(`/menu?target=${encodeURIComponent(`${__CLIENT_PROTOCOL__}://${__DOMAIN__}/menu/${params.orderId}`)}#login`, true))
				}
				promises = new Promise(resolve => { resolve() })
			}
		} else {
			if (store.getState().basket.get('orderId')) {
				store.dispatch(actions.basketReset())
				store.dispatch(actions.basketChosenAddressChange(store.getState().user.get('shippingAddresses').first()))
			}
			let fetchPromise = new Promise(resolve => { resolve() })
			let browseMode = true
			if (store.getState().request.get('browser', '') === 'mobile' && store.getState().features.getIn(['browse', 'value']) !== true) {
				browseMode = false
			}
			if (disableBrowseMode) {
				browseMode = false
			}

			if (query.date || query.slot_id || store.getState().basket.get('date') || store.getState().basket.get('slotId')) {
				browseMode = false

				fetchPromise = store.dispatch(actions.menuLoadDays())
					.then(() => store.dispatch(actions.boxSummaryDeliveryDaysLoad()))
			}

			if (query.date) {
				store.dispatch(actions.basketDateChange(query.date))
			} else if (!store.getState().basket.get('date')) {
				if (!browseMode) {
					fetchPromise = fetchPromise.then(chooseFirstDate)
				}
			}

			if (query.num_portions && !store.getState().basket.get('numPortionsChanged')) {
				store.dispatch(actions.basketNumPortionChange(query.num_portions))
			}

			if (query.slot_id && !store.getState().basket.get('slotId')) {
				store.dispatch(actions.basketSlotChange(query.slot_id))
			}

			let cutoffDateTime = browseMode ? cutoffDateTimeNow() : undefined
			if (isAdmin) {
				cutoffDateTime = query.cutoffDate || store.getState().basket.get('date') || cutoffDateTimeNow()
			}

			const promiseAllQueries = [
				[actions.menuLoadMenu, cutoffDateTime, background],
			]

			if (!browseMode) {
				promiseAllQueries.push([actions.menuLoadStock, true])
			}

			if (query.postcode && !store.getState().basket.get('postcode')) {
				promiseAllQueries.push([actions.basketPostcodeChangePure, query.postcode.trim()])
			}

			promises = fetchPromise
				.then(() => (
					Promise.all(promiseAllQueries.map(promiseAction => (
						store.dispatch(promiseAction[0].call(null, promiseAction[1], promiseAction[2]))
					)))
				))

			if (browseMode || isAdmin) {
				promises = promises.then(() => {
					store.dispatch(actions.menuAddEmptyStock())
					store.dispatch(actions.temp('cutoffDateTime', cutoffDateTime))
				})
			}
		}

		let collectionName = query.collection
		if (!store.getState().features.getIn(['forceCollections', 'true'])) {
			const featureCollectionFreeze = store.getState().features.getIn(['collectionFreeze', 'value'])
			if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
				collectionName = featureCollectionFreeze
			}
		}

		promises = promises.then(() => {
			if (shouldPreselectCollection(store.getState())) {
				selectCollection(store.getState(), collectionName, store.dispatch)
			}
		})

		if (isAuthenticated && !isAdmin && query.recipes && !store.getState().basket.get('recipes').size) {
			promises = promises.then(() => {
				let newRecipes = []
				const inStockRecipes = store.getState().menuRecipeStock.filter(el => el.get(store.getState().basket.get('numPortions').toString()) > 0).keySeq().toArray()
				newRecipes = query.recipes.slice(1, -1).split(',').filter(el => inStockRecipes.indexOf(el) > -1)
					.slice(0, 4)
				newRecipes.forEach(i => {
					store.dispatch(actions.basketRecipeAdd(i))
				})
			})
		}
		fetchDataPromise = promises.then(() => {
			store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, false))
		}).catch(err => {
			store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, false))
			throw err
		})
	} else {
		fetchDataPromise = new Promise(resolve => { resolve() })
	}

	return fetchDataPromise
}
