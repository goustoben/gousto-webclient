import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import FilterNav from './FilterNav'
import withScroll from 'hoc/withScroll'
import filterActions from 'actions/filters'
import { getFilterCTAText } from 'selectors/filters'

const handleScroll = withScroll({
	height: 50,
	propName: 'sticky',
})

const connected = connect((state) => ({
	ctaText: getFilterCTAText(state),
	menuFilterExperiment: state.features.getIn(['filterMenu', 'value'])
}), {
	onClick: filterActions.filterMenuOpen,
})

export default compose(
	handleScroll,
	connected,
	pure,
)(FilterNav)
