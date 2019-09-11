import { connect } from 'react-redux'

import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters.js'
import FilterButton from './FilterButton'

const mapStateToProps = (state) => ({
  count: getFilteredRecipeIds(state).size,
})

const FilterButtonContainer = connect(mapStateToProps)(FilterButton)

export default FilterButtonContainer
