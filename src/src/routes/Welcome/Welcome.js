import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import PropTypes from 'prop-types'
import classnames from 'classnames'

import actions from 'actions'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import Content from 'containers/Content'
import { trackAffiliatePurchase } from 'actions/tracking'
import { getAffiliateTrackingData } from 'utils/order'

import OrderSummary from 'containers/welcome/OrderSummary'
import ProductSelection from 'containers/welcome/ProductSelection'
import SubHeader from './SubHeader'
import css from './Welcome.css'
import ExpectationsCarousel from './ExpectationsCarousel'
import ProductDetailOverlay from './ProductDetailOverlay'
import { ReferAFriend } from '../OrderConfirmation/components/ReferAFriend'

class Welcome extends React.PureComponent {
  static propTypes = {
    orderId: PropTypes.string.isRequired,
    productDetailId: PropTypes.string,
    productDetailVisibilityChange: PropTypes.func,
    products: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    isRafFeatureEnabled: PropTypes.bool,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static fetchData({ store, params, query }) {
    const { orderId } = params
    let userOrder

    return store.dispatch(actions.userLoadOrder(orderId))
      .then(() => {
        userOrder = userUtils.getUserOrderById(orderId, store.getState().user.get('orders'))

        if (userOrder.get('phase') !== 'open') {
          return Promise.reject(new Error({
            level: 'warning',
            message: `Can't view welcome page with non open order ${orderId}`,
          }))
        }

        trackAffiliatePurchase(
          getAffiliateTrackingData(userOrder, 'FIRSTPURCHASE')
        )

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

  state = {
    isClient: false,
  }

  componentDidMount() {
    this.setState({ isClient: true }) // eslint-disable-line react/no-did-mount-set-state

    const { store } = this.context
    const { query = {}, params = {}, userFetchReferralOffer } = this.props

    Welcome.fetchData({ store, query, params })
    userFetchReferralOffer()
  }

  isProductDetailAvailable = () => {
    const { productDetailId, products } = this.props

    return !!productDetailId && products.has(productDetailId)
  }

  render() {
    const { isClient } = this.state
    const { user, orderId, productDetailId, productDetailVisibilityChange, isRafFeatureEnabled } = this.props

    return (
      <section className={css.container} data-testing="welcomeContainer">
        <Content
          contentKeys="welcomeImmediateTitleMessage"
          propNames="message"
        >
          <SubHeader
            nameFirst={user.get('nameFirst')}
            contentKeys="welcomeImmediateTitleText"
          />
        </Content>

        <div className={css.contentContainer}>
          <div className={css.row}>
            <div className={css.colMedium}>
              <div className={css.welcomeColInner}>
                <ExpectationsCarousel />
              </div>
              {
                isRafFeatureEnabled && (
                <div className={classnames(css.welcomeColInner, css.mobileShow, css.rafMobile)}>
                  <ReferAFriend />
                </div>
                )
              }
              <div className={css.welcomeColInner}>
                <ProductSelection
                  orderId={orderId}
                />
              </div>
            </div>
            <div className={classnames(css.colSmall, css.colTopXS)}>
              <div className={classnames(css.welcomeColInner, css.colTopXSInner)}>
                <OrderSummary />
              </div>
              {
                isRafFeatureEnabled && (
                  <div className={classnames(css.welcomeColInner, css.colTopXSInner, css.mobileHide,)}>
                    <ReferAFriend />
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <ProductDetailOverlay
          onVisibilityChange={productDetailVisibilityChange}
          open={isClient && this.isProductDetailAvailable()}
          productId={productDetailId}
        />
      </section>
    )
  }
}

export default Welcome
