import { connect } from 'react-redux'

import actions from 'actions'
import FilterMenu from './FilterMenu'

const mapStateToProps = (state) => ({
	open: state.menu.get('filtersMenuVisible'),
	slideFrom: state.request.get('browser') === 'mobile' ? 'bottom' : 'left',
})

const mapActionsToProps = {
	filterMenuClose: actions.filterMenuClose,
	filterMenuApply: actions.filterMenuApply,
	filterMenuRevertFilters: actions.filterMenuRevertFilters,
	clearAllFilters: actions.clearAllFilters,
}

const FilterMenuContainer = connect(mapStateToProps, mapActionsToProps)(FilterMenu)

export default FilterMenuContainer
