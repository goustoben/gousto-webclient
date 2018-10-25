import Helmet from 'react-helmet'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import css from './GetHelp.css'

class GetHelp extends PureComponent {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.shape({
				orderId: PropTypes.string,
			}),
		}),
		children: PropTypes.node.isRequired,
	}

	componentDidMount() {
		const { orders } = this.props
		const orderId = this.getOrderId(this.props)

		if (orderId && Object.keys(orders).length < 1) {
			this.props.userLoadOrder(orderId).then(this.orderLoadComplete)
		}
	}

	getOrderId({ location }) {
		const { query } = location

		return (query && query.orderId)
			? query.orderId
			: null
	}

	orderLoadComplete = () => {
		const orderId = this.getOrderId(this.props)
		const order = this.props.orders[orderId]
		const recipeIds = order.recipeItems
			.reduce((acc, recipe) => {
				acc.push(recipe.recipeId)

				return acc
			}, [])

		this.props.storeGetHelpOrderId(orderId)
		this.props.recipesLoadRecipesById(recipeIds).then(this.recipesLoadComplete)
	}

	render() {
		const { children } = this.props

		return <div className={css.getHelpContainer}>
			<Helmet
				style={[{
					cssText: '#react-root { height: 100%; }',
				}]}
			/>
			<div className={css.getHelpContent}>
				{children}
			</div>
		</div>
	}
}

export default GetHelp
