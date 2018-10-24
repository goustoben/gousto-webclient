import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from './OrderItemSummary.css'

const OrderItemSummary = ({
	recipes,
	numberOfProducts,
}) => (
	<div className={css.orderItemSummary}>
		{recipes.size ? `${recipes.size} recipes` : ''}
		{recipes.size && numberOfProducts ? ', ' : ''}
		{numberOfProducts ? `${numberOfProducts} extras` : ''}
	</div>
)

OrderItemSummary.propTypes = {
	recipes: PropTypes.instanceOf(Immutable.List),
	numberOfProducts: PropTypes.number,
}

OrderItemSummary.defaultProps = {
	recipes: Immutable.List([]),
	numberOfProducts: 0,
}

export default OrderItemSummary
