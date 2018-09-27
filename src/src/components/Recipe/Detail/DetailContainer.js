import { connect } from 'react-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */

import actions from 'actions'
import { getCutoffs } from 'utils/deliveries'
import moment from 'moment'

import Detail from './Detail'

function mapStateToProps(state, props) {
	let [cutoffDate] = getCutoffs(state.basket, state.boxSummaryDeliveryDays) // eslint-disable-line prefer-const
	if (!cutoffDate) {
		cutoffDate = moment()
			.minutes(0)
			.seconds(0)
			.milliseconds(0)
			.toISOString()
	}
	function getBasketRecipes(recipes) {
		return Array.from(recipes.keys())
	}

	return {
		cutoffDate,
		inBasket: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))).includes(props.recipeId),
	}
}

const DetailContainer = connect(mapStateToProps, {
	menuRecipeDetailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
})(Detail)

export default DetailContainer
