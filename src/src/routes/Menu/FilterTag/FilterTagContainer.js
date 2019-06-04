import { connect } from 'react-redux'

import { filterApply } from 'actions/filters'
import FilterTag from './FilterTag'

const FilterTagContainer = connect((state) => ({
  browser: state.request.get('browser'),
}), {
  filterApply
})(FilterTag)

export default FilterTagContainer
