import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import FilterNav from './FilterNav'
import withScroll from 'hoc/withScroll'
import filterActions from 'actions/filters'
import { getFilterCTAText } from 'selectors/filters'
import { getCurrentCollectionSlug } from '../selectors/menu'
import actionTypes from 'actions'

const handleScroll = withScroll({
	height: 50,
	propName: 'sticky',
})

const connected = connect((state) => ({
	ctaText: getFilterCTAText(state),
	menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
	ifRecommendationIsSelected: getCurrentCollectionSlug(state) === 'recommendations',
	isLoadingHeart: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
}), {
	onClick: filterActions.filterMenuOpen,
})

export default compose(
	handleScroll,
	connected,
	pure,
)(FilterNav)
