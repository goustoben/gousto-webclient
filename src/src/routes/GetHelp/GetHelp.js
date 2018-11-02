import Helmet from 'react-helmet'
import React, { PropTypes, PureComponent } from 'react'
import { Error } from './components/Error'
import { client as routes } from 'config/routes'
import css from './GetHelp.css'

const skipFetchByRoute = ({ pathname }) => ([
	`${routes.getHelp.index}/${routes.getHelp.contact}`,
	`${routes.getHelp.index}/${routes.getHelp.confirmation}`,
].includes(pathname))

class GetHelp extends PureComponent {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.shape({
				orderId: PropTypes.string,
			}),
		}),
		children: PropTypes.node.isRequired,
		content: PropTypes.shape({
			button1: PropTypes.string,
			errorBody: PropTypes.string,
			infoBody: PropTypes.string,
			title: PropTypes.string,
		}),
	}

	state = {
		didFetchError: false,
		isFetching: true
	}

	componentDidMount() {
		const orderId = this.getOrderId(this.props)

		if (skipFetchByRoute(this.props.location)) {
			return this.fetchSuccess()
		}

		if (!orderId) {
			return this.fetchError()
		}

		this.props.storeGetHelpOrderId(orderId)

		return this.props.userLoadOrder(orderId)
			.then(this.orderLoadComplete)
			.catch(this.fetchError)
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
			isFetching: false,
		})
	}

	orderLoadComplete = () => {
		const orderId = this.getOrderId(this.props)
		const order = this.props.orders[orderId]
		const recipeIds = order.recipeItems
			.map((recipe) => recipe.recipeId)

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
					{!isFetching && <Error
						content={this.props.content}
						hasError={didFetchError}
					>
						{children}
					</Error>}
				</div>
			</div>
		)
	}
}

export default GetHelp
