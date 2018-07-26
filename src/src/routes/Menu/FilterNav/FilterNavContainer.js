import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import FilterNav from './FilterNav'
import filterActions from 'actions/filters'
import withScroll from 'hoc/withScroll'

const handleScroll = withScroll({
	height: 50,
	propName: 'sticky',
})

const connected = connect(({ filters, menuCollections }) => ({
	ctaText: menuCollections.getIn([
		filters.get('currentCollectionId'),
		'shortTitle',
	]),
}), {
	onClick: filterActions.filterMenuOpen,
})

export default compose(
	handleScroll,
	connected,
	pure,
)(FilterNav)
