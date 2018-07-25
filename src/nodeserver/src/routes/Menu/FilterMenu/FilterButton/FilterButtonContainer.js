import { connect } from 'react-redux'

import FilterButton from './FilterButton'
import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters.js'

const mapStateToProps = (state) => ({
	count: getFilteredRecipeIds(state).size,
})

const FilterButtonContainer = connect(mapStateToProps)(FilterButton)

export default FilterButtonContainer
