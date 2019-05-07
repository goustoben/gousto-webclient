import { connect } from 'react-redux'

import filterActions from 'actions/filters'
import actionTypes from 'actions'
import FilterTag from './FilterTag'

const FilterTagContainer = connect((state) => ({
  isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
}), {
  filterDietaryAttributesChange: filterActions.filterDietaryAttributesChange,
})(FilterTag)

export default FilterTagContainer
