import { connect } from 'react-redux'
import filterActions from 'actions/filters'
import FilterTagsNav from './FilterTagsNav'
import config from 'config/recipes'

import { getAllRecipesCollectionId } from 'routes/Menu/selectors/filters'

export default connect((state) => {
	const { filters, menuCollections } = state
	const tags = [
			(menuCollections.getIn([filters.get('currentCollectionId'), 'shortTitle'], 'All Recipes') === 'All Recipes') ? null : {
				text: menuCollections.getIn([filters.get('currentCollectionId'), 'shortTitle'], 'All Recipes'),
				type: 'collection',
				value: getAllRecipesCollectionId(state),
			},
			...filters.get('dietTypes', []).map((dietType) => ({
				text: config.dietTypes[dietType],
				type: 'dietType',
				value: dietType,
			})),
			...filters.get('dietaryAttributes', []).map((dietaryAttribute) => ({
				text: config.dietaryAttributes[dietaryAttribute],
				type: 'dietaryAttribute',
				value: dietaryAttribute,
			})),
			(filters.get('totalTime', '0') === '0') ? null : {
				text: config.totalTime[filters.get('totalTime', '0')],
				type: 'totalTime',
				value: '0',
			}
		].filter(item => item && item.text)

		return {
			tags,
		}
}, {
	onCTAClick: filterActions.filterMenuOpen,
})(FilterTagsNav)
