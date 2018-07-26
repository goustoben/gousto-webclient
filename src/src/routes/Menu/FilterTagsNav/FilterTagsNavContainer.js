import { connect } from 'react-redux'
import filterActions from 'actions/filters'
import FilterTagsNav from './FilterTagsNav'

export default connect(() => ({}), {
	onCTAClick: filterActions.filterMenuOpen,
})(FilterTagsNav)
