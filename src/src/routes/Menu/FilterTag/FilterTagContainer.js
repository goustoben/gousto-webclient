import { connect } from 'react-redux'

import FilterTag from './FilterTag'
import filterActions from 'actions/filters'
import actionTypes from 'actions'

const FilterTagContainer = connect((state) => ({
	isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
}), {
	collectionFilterChange: filterActions.filterCollectionChange,
	filterCurrentDietTypesChange: filterActions.filterCurrentDietTypesChange,
	filterDietaryAttributesChange: filterActions.filterDietaryAttributesChange,
	filterCurrentTotalTimeChange: filterActions.filterCurrentTotalTimeChange,
})(FilterTag)

export default FilterTagContainer
