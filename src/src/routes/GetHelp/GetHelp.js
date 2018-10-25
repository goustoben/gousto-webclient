import Helmet from 'react-helmet'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Error } from './components/Error'
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

	state = {
		didFetchError: false,
		isFetching: true
	}

	componentDidMount() {
		const { orders } = this.props
		const orderId = this.getOrderId(this.props)

		if (orderId && Object.keys(orders).length < 1) {
			this.props.userLoadOrder(orderId)
				.then(this.orderLoadComplete)
				.catch(this.fetchError)
		}
	}

	getOrderId({ location }) {
		const { query } = location

		return (query && query.orderId)
			? query.orderId
			: null
	}

	fetchSuccess = () => {
		this.setState({
			...this.state,
			didFetchError: false,
			isFetching: false,
		})
	}

	fetchError = () => {
		this.setState({
			...this.state,
			didFetchError: true,
			isFetching: true,
		})
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
		this.props.recipesLoadRecipesById(recipeIds)
			.then(this.fetchSuccess)
			.catch(this.fetchError)
	}

	render() {
		const { children } = this.props
		const {
			isFetching,
			didFetchError
		} = this.state

		return (
			<div className={css.getHelpContainer}>
				<Helmet
					style={[{
						cssText: '#react-root { height: 100%; }',
					}]}
				/>
				<div className={css.getHelpContent}>
					{!isFetching && <Error hasError={didFetchError}>{ children }</Error>}
				</div>
			</div>
		)
	}
}

export default GetHelp
