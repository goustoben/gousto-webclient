import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import shallowCompare from 'react-addons-shallow-compare'
import actions from 'actions'
import userUtils from 'utils/user'
import productUtils from 'utils/products'
import Content from 'containers/Content'
import logger from 'utils/logger'

import OrderSummary from 'containers/welcome/OrderSummary'
import css from '../Welcome.css'

import SubHeader from '../SubHeader'
import ProductList from 'Product/List'
import ExpectationsCarousel from '../ExpectationsCarousel'
import ProductDetailOverlay from '../ProductDetailOverlay'

class Welcome extends React.PureComponent {
  static fetchData({ store, params, query }) {
    return store.dispatch(actions.userLoadOrders())
      .then(() => {
        const userOrder = userUtils.getUserOrderById(params.orderId, store.getState().user.get('orders'))

        if (userOrder.get('phase') !== 'open') {
          return Promise.reject({
            level: 'warning',
            message: `Can't view welcome page with non open order ${params.orderId}`,
          })
        }

        const orderRecipeIds = userUtils.getUserOrderRecipeIds(userOrder)
        const orderProductIds = [
          ...userUtils.getUserOrderProductIds(userOrder),
          ...userUtils.getUserOrderGiftProductIds(userOrder),
        ]

        return Promise.all([
          store.dispatch(actions.productsLoadProducts()),
          store.dispatch(actions.recipesLoadRecipesById(orderRecipeIds)),
          store.dispatch(actions.productsLoadProductsById(orderProductIds)),
          store.dispatch(actions.contentLoadContentByPageSlug('welcome_immediate', query.var)),
        ])
      })
      .catch(err => {
        if (err && err.level && typeof logger[err.level] === 'function') {
          logger[err.level](err.message)
        } else {
          logger.error(err)
        }
        store.dispatch(actions.redirect('/'))
      })
  }

  constructor() {
    super()

    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true }) // eslint-disable-line react/no-did-mount-set-state

    if (!this.props.user.get('orders').size) {
      this.props.userLoadOrders()
        .then(() => {
          const userOrder = userUtils.getUserOrderById(this.props.orderId, this.props.user.get('orders'))
          const orderRecipeIds = userUtils.getUserOrderRecipeIds(userOrder)
          const orderProductIds = [...userUtils.getUserOrderProductIds(userOrder), ...userUtils.getUserOrderGiftIds(userOrder)]

          this.props.recipesLoadRecipesById(orderRecipeIds)
          this.props.productsLoadProductsById(orderProductIds)
        })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isAuthenticated && shallowCompare(this, nextProps, nextState)
  }

	isProductDetailAvailable = () =>
	  !!this.props.productDetailId && this.props.products.has(this.props.productDetailId)

	render() {
	  const userOrder = userUtils.getUserOrderById(this.props.orderId, this.props.user.get('orders'))
	  const randomProducts = productUtils.getOneProductFromEachCategory(this.props.products, this.props.orderId)

	  return (
			<section className={css.container} data-testing="welcomeContainer">
				<Content
				  contentKeys="welcome_immediate.welcome_immediate_header.welcome_immediate_title.welcome_immediate_title_message"
				  propnames="message"
				>
					<SubHeader
					  nameFirst={this.props.user.get('nameFirst')}
					  contentKeys="welcome_immediate.welcome_immediate_header.welcome_immediate_title.welcome_immediate_title_text"
					/>
				</Content>

				<div className={css.contentContainer}>
					<div className={css.row}>
						<div className={css.colMedium}>
							<div className={css.welcomeColInner}>
								<ExpectationsCarousel />
							</div>
						</div>
						<div className={css.colSmall}>
							<div className={css.welcomeColInner}>
								<OrderSummary
								  order={userOrder}
								/>
							</div>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colMedium}>
							<div className={css.welcomeColInner}>
								<ProductList
								  products={randomProducts}
								  number={6}
								  orderId={this.props.orderId}
								/>
							</div>
						</div>
					</div>
				</div>

				<ProductDetailOverlay
				  productId={this.props.productDetailId}
				  open={this.state.isClient && this.isProductDetailAvailable()}
				/>
			</section>
	  )
	}
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  productDetailId: PropTypes.string,
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsLoadProducts: PropTypes.func.isRequired,
  productsLoadProductsById: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipesLoadRecipesById: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  userLoadOrders: PropTypes.func.isRequired,
  contentLoadContentByPageSlug: PropTypes.func.isRequired,
}

export default Welcome
