import { connect } from 'react-redux'
import menuActions from 'actions/menu'
import Immutable from 'immutable' /* eslint-disable new-cap */
import SubHeader from './SubHeader'

const SubHeaderContainer = connect((state, ownProps) => {
	const isAuthenticated = state.auth.get('isAuthenticated')
	const collectionNavIsShown = state.features.getIn(['collectionsNav', 'value']) !== false
	const collectionsAreEnabled = state.features.getIn(['collections', 'value']) === true
	let showVegetarianFilter = !(collectionNavIsShown && collectionsAreEnabled)
	if (state.features.getIn(['forceCollections', 'value']) === true) {
		showVegetarianFilter = false
	}

	let orderRecipesNo = 0

	if (ownProps.orderId) {
		orderRecipesNo = state.basket.get('recipes', Immutable.List([])).size
	}
	const filterVegetarian = state.menuFilterVegetarian

	return {
		filterVegetarian,
		orderRecipesNo,
		showVegetarianFilter,
		isAuthenticated,
		fromJoin: state.persist.get('simpleHeader', false),
	}
}, {
	onFilterVegetarianChange: menuActions.menuFilterVegetarianChange,
})(SubHeader)

export default SubHeaderContainer
