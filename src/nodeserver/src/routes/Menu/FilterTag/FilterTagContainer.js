import { connect } from 'react-redux'

import FilterTag from './FilterTag'
import filterActions from 'actions/filters'

const FilterTagContainer = connect(() => ({}), {
	collectionFilterChange: filterActions.filterCollectionChange,
	filterCurrentDietTypesChange: filterActions.filterCurrentDietTypesChange,
	filterDietaryAttributesChange: filterActions.filterDietaryAttributesChange,
	filterCurrentTotalTimeChange: filterActions.filterCurrentTotalTimeChange,
})(FilterTag)

export default FilterTagContainer
