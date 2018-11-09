import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import shallowCompare from 'react-addons-shallow-compare'
import actions from 'actions'
import Content from 'containers/Content'
import userUtils from 'utils/user'
import logger from 'utils/logger'

import css from './Welcome.css'
import classnames from 'classnames'

import SubHeader from './SubHeader'
import OrderSummary from 'containers/welcome/OrderSummary'
import ProductSelection from 'containers/welcome/ProductSelection'
import ExpectationsCarousel from './ExpectationsCarousel'
import ProductDetailOverlay from './ProductDetailOverlay'

class Welcome extends React.PureComponent {
	static propTypes = {
	  contentLoadContentByPageSlug: PropTypes.func.isRequired,
	  isAuthenticated: PropTypes.bool.isRequired,
	  orderId: PropTypes.string.isRequired,
	  productDetailId: PropTypes.string,
	  productDetailVisibilityChange: PropTypes.func,
	  products: PropTypes.instanceOf(Immutable.Map).isRequired,
	  productsLoadCategories: PropTypes.func.isRequired,
	  productsLoadProducts: PropTypes.func.isRequired,
	  productsLoadProductsById: PropTypes.func.isRequired,
	  productsLoadStock: PropTypes.func.isRequired,
	  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
	  recipesLoadRecipesById: PropTypes.func.isRequired,
	  user: PropTypes.instanceOf(Immutable.Map).isRequired,
	  userLoadOrder: PropTypes.func.isRequired,
	}

	static contextTypes = {
	  store: PropTypes.object.isRequired,
	}

	static fetchData({ store, params, query }) {
	  const orderId = params.orderId
	  let userOrder

	  return store.dispatch(actions.userLoadOrder(orderId))
	    .then(() => {
	      userOrder = userUtils.getUserOrderById(orderId, store.getState().user.get('orders'))

	      if (userOrder.get('phase') !== 'open') {
	        return Promise.reject({
	          level: 'warning',
	          message: `Can't view welcome page with non open order ${orderId}`,
	        })
	      }

	      const orderRecipeIds = userUtils.getUserOrderRecipeIds(userOrder)

	      return Promise.all([
	        store.dispatch(actions.contentLoadContentByPageSlug('welcome_immediate', query.var)),
	        store.dispatch(actions.productsLoadProducts(userOrder.get('whenCutoff'))),
	        store.dispatch(actions.productsLoadStock()),
	        store.dispatch(actions.productsLoadCategories()),
	        store.dispatch(actions.recipesLoadRecipesById(orderRecipeIds)),
	      ])
	    })
	    .then(() => {
	      const orderProductIds = [
	        ...userUtils.getUserOrderProductIds(userOrder),
	        ...userUtils.getUserOrderGiftProductIds(userOrder),
	      ]

	      return store.dispatch(actions.productsLoadProductsById(orderProductIds))
	    })
	    .then(() => {
	      store.dispatch(actions.basketOrderLoad(orderId))
	      store.dispatch(actions.trackFirstPurchase(orderId))
	    })
	    .catch(err => {
	      if (err && err.level && typeof logger[err.level] === 'function') {
	        logger[err.level](err.message)
	      } else {
	        logger.error(err.message)
	      }
	      store.dispatch(actions.redirect('/'))
	    })
	}

	state = {
	  isClient: false,
	}

	componentDidMount() {
	  this.setState({ isClient: true }) // eslint-disable-line react/no-did-mount-set-state

	  const store = this.context.store
	  const query = this.props.query || {}
	  const params = this.props.params || {}
	  Welcome.fetchData({ store, query, params })
	}

	shouldComponentUpdate(nextProps, nextState) {
	  return this.props.isAuthenticated && shallowCompare(this, nextProps, nextState)
	}

	isProductDetailAvailable = () =>
	  !!this.props.productDetailId && this.props.products.has(this.props.productDetailId)

	render() {
	  return (
			<section className={css.container} data-testing="welcomeContainer">
				<Content
				  contentKeys="welcomeImmediateTitleMessage"
				  propNames="message"
				>
					<SubHeader
					  nameFirst={this.props.user.get('nameFirst')}
					  contentKeys="welcomeImmediateTitleText"
					/>
				</Content>

				<div className={css.contentContainer}>
					<div className={css.row}>
						<div className={css.colMedium}>
							<div className={css.welcomeColInner}>
								<ExpectationsCarousel />
							</div>
							<div className={css.welcomeColInner}>
								<ProductSelection
								  orderId={this.props.orderId}
								/>
							</div>
						</div>
						<div className={classnames(css.colSmall, css.colTopXS)}>
							<div className={classnames(css.welcomeColInner, css.colTopXSInner)}>
								<OrderSummary />
							</div>
						</div>
					</div>
				</div>

				<ProductDetailOverlay
				  onVisibilityChange={this.props.productDetailVisibilityChange}
				  open={this.state.isClient && this.isProductDetailAvailable()}
				  productId={this.props.productDetailId}
				/>
			</section>
	  )
	}
}

export default Welcome
