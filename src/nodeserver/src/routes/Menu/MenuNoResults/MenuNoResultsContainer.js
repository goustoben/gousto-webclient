import Immutable from 'immutable'
import { connect } from 'react-redux'

import MenuNoResults from './MenuNoResults'
import { initialState } from 'reducers/filters'

const MenuNoResultsContainer = connect(({ filters }) => {
	const nonCollectionFilters = initialState().set('currentCollectionId', filters.get('currentCollectionId', ''))

	return {
		hasFilters: !Immutable.is(filters, nonCollectionFilters),
	}
})(MenuNoResults)

export default MenuNoResultsContainer
