import { connect } from 'react-redux'
import actions from 'actions'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'
import Menu from './Menu'
import { getCutoffs } from 'utils/deliveries'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { getFilteredRecipeIds } from './selectors/filters.js'
import moment from 'moment'
import { slugify } from 'utils/url'

function mapStateToProps(state, ownProps) {
	function getBasketRecipes(recipes) {
		return Array.from(recipes.keys())
	}

	let [cutoffDate] = getCutoffs(state.basket, state.boxSummaryDeliveryDays) // eslint-disable-line prefer-const
	if (!cutoffDate) {
		cutoffDate = moment()
			.minutes(0)
			.seconds(0)
			.milliseconds(0)
			.toISOString()
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
		collectionId = getDefaultCollectionId(state)
	}

	const orderId = (ownProps.params && ownProps.params.orderId) ? ownProps.params.orderId : ''
	let orderRecipesNo = 0

	if (orderId !== '') {
		orderRecipesNo = state.basket.get('recipes', Immutable.List([])).size
	}

	return {
		recipes: state.menuRecipes,
		recipesStore: state.recipes,
		cutoffDate,
		numPortions: state.basket.get('numPortions'),
		stock: state.menuRecipeStock,
		basketRecipeIds: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))),
		menuRecipeDetailShow: (ownProps.location && ownProps.location.query) ? ownProps.location.query.recipeDetailId : '',
		boxSummaryShow: state.boxSummaryShow.get('show'),
		filterVegetarian: state.menuFilterVegetarian,
		menuCurrentCollectionId: collectionId,
		menuCollectionRecipes: state.menuCollectionRecipes,
		features: state.features,
		menuBrowseCTAShow: state.menuBrowseCTAShow,
		boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
		query: ownProps.location && ownProps.location.query ? ownProps.location.query : {},
		orderId,
		isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
		orderRecipesNo,
		disabled: state.auth.get('isAdmin'),
		fromJoin: state.persist.get('simpleHeader', false),
		isAuthenticated: state.auth.get('isAuthenticated'),
		tariffId: state.basket.get('tariffId'),
		menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
		menuVariation: state.features.getIn(['menuRecipes', 'value']),
		filteredRecipesNumber: getFilteredRecipeIds(state).size,
	}
}

const MenuContainer = connect(mapStateToProps, {
	basketOrderLoaded: actions.basketOrderLoaded,
	menuLoadMenu: actions.menuLoadMenu,
	menuLoadBoxPrices: actions.menuLoadBoxPrices,
	detailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
	filterVegetarianChange: actions.menuFilterVegetarianChange,
	boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
	menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
	menuMobileGridViewSet: actions.menuMobileGridViewSet,
	basketRestorePreviousValues: actions.basketRestorePreviousValues,
	boxSummaryDeliveryDaysLoad: actions.boxSummaryDeliveryDaysLoad,
	menuLoadDays: actions.menuLoadDays,
	loginVisibilityChange: actions.loginVisibilityChange,
	clearAllFilters: actions.clearAllFilters,
})(Menu)

export default MenuContainer
