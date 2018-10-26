import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import css from './OrderSideSwipe.css'
import OrderRecipe from '../../../../../../AccountComponents/OrderRecipe'

const OrderSideSwipe = ({
	recipes,
	orderState,
}) => {
	const maxRecipes = ['confirmed', 'dispatched'].indexOf(orderState) > -1 ? recipes.size : 4
	const recipesRendered = []
	for (let i = 0; i < maxRecipes; i++) {
		recipesRendered.push(
			<OrderRecipe
				recipeImage={recipes.get(i) ? recipes.get(i).get('image') : ''}
				recipeTitle={recipes.get(i) ? recipes.get(i).get('title') : ''}
				key={recipes.get(i) ? recipes.get(i).get('recipeId') * i : i}
			/>
		)
	}

	return (
		<div className={css.horizontalScrollWrapper}>
			{recipesRendered}
		</div>
	)
}

OrderSideSwipe.propTypes = {
	recipes: PropTypes.instanceOf(Immutable.List),
	orderState: PropTypes.string,
}

OrderSideSwipe.defaultProps = {
	recipes: Immutable.List([]),
	orderState: '',
}

export default OrderSideSwipe
