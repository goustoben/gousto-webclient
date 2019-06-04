import { connect } from 'react-redux'

import filterActions from 'actions/filters'
import FilterTag from './FilterTag'

const FilterTagContainer = connect((state) => ({
  browser: state.request.get('browser'),
}), {
  filterDietaryAttributesChange: filterActions.filterDietaryAttributesChange,
  
})(FilterTag)

export default FilterTagContainer
