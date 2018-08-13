import { connect } from 'react-redux'

import actions from 'actions'
import config from 'config'

import DietaryAttributesFilter from './DietaryAttributesFilter'

const mapStateToProps = (state) => ({
	dietaryAttributes: state.filters.get('dietaryAttributes'),
	dietaryAttributeTypes: config.recipes.dietaryAttributes,
})

const mapActionsToProps = {
	filterDietaryAttributesChange: actions.filterDietaryAttributesChange,
}

const DietaryAttributesFilterContainer = connect(
	mapStateToProps,
	mapActionsToProps,
)(DietaryAttributesFilter)

export default DietaryAttributesFilterContainer
