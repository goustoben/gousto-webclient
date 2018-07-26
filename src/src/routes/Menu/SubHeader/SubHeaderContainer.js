import { connect } from 'react-redux'
import SubHeader from './SubHeader'

const SubHeaderContainer = connect((state) => {
	const isAuthenticated = state.auth.get('isAuthenticated')
	const collectionNavIsShown = state.features.getIn(['collectionsNav', 'value']) !== false
	const collectionsAreEnabled = state.features.getIn(['collections', 'value']) === true
	let showVegetarianFilter = !(collectionNavIsShown && collectionsAreEnabled)
	if (state.features.getIn(['forceCollections', 'value']) === true) {
		showVegetarianFilter = false
	}

	return {
		showVegetarianFilter,
		isAuthenticated,
	}
}, {})(SubHeader)

export default SubHeaderContainer
