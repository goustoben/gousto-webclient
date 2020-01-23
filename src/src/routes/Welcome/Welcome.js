import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { VerticalStages, VerticalStagesItem } from 'goustouicomponents'

import actions from 'actions'
import logger from 'utils/logger'
import userUtils from 'utils/user'
import Content from 'containers/Content'

import OrderSummary from 'containers/welcome/OrderSummary'
import ProductSelection from 'containers/welcome/ProductSelection'
import { ReferAFriend } from '../OrderConfirmation/components/ReferAFriend'
import ProductDetailOverlay from './ProductDetailOverlay'
import { AwinPixel } from './AwinPixel'
import css from './Welcome.css'
import { AppPromo } from './AppPromo'

class Welcome extends React.PureComponent {
  static propTypes = {
    orderId: PropTypes.string.isRequired,
    productDetailId: PropTypes.string,
    productDetailVisibilityChange: PropTypes.func,
    products: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    userFetchReferralOffer: PropTypes.func.isRequired,
    query: PropTypes.shape({
      var: PropTypes.string
    }).isRequired,
    params: PropTypes.shape({
      orderId: PropTypes.string
    }).isRequired,
    device: PropTypes.string,
    trackWelcomeAppPromoClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static fetchData({ store, params, query }) {
    const { orderId } = params
    let userOrder

    return store
      .dispatch(actions.userLoadOrder(orderId))
      .then(() => {
        userOrder = userUtils.getUserOrderById(
          orderId,
          store.getState().user.get('orders')
        )

        if (userOrder.get('phase') !== 'open') {
          return Promise.reject(
            new Error({
              level: 'warning',
              message: `Can't view welcome page with non open order ${orderId}`
            })
          )
        }

        const orderRecipeIds = userUtils.getUserOrderRecipeIds(userOrder)

        return Promise.all([
          store.dispatch(
            actions.contentLoadContentByPageSlug('welcome_immediate', query.var)
          ),
          store.dispatch(
            actions.productsLoadProducts(userOrder.get('whenCutoff'))
          ),
          store.dispatch(actions.productsLoadStock()),
          store.dispatch(actions.productsLoadCategories()),
          store.dispatch(actions.recipesLoadRecipesById(orderRecipeIds))
        ])
      })
      .then(() => {
        const orderProductIds = [
          ...userUtils.getUserOrderProductIds(userOrder),
          ...userUtils.getUserOrderGiftProductIds(userOrder)
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
    isClient: false
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
    const {
      user,
      orderId,
      productDetailId,
      productDetailVisibilityChange,
      device,
      trackWelcomeAppPromoClick
    } = this.props

    const defaultMessage = 'You’ve just made your first step towards a life with more free time, better food and less hassle than ever before. Let the good times roll!'

    return (
      <section className={css.container} data-testing="welcomeContainer">
        <div className={css.contentContainer}>
          <div className={css.row}>
            <div className={css.colMedium}>
              <div className={css.welcomeColInnerVerticalStages}>
                <VerticalStages>
                  <Content
                    contentKeys="welcomeImmediateTitleText"
                    propNames="title"
                    backgroundColor="white"
                    isCompleted
                  >
                    <VerticalStagesItem
                      title={`Thanks ${user.get('nameFirst')}`}
                    >
                      <Content contentKeys="welcomeImmediateTitleMessage">
                        <p>{defaultMessage}</p>
                      </Content>
                      <div className={css.mobileShow}>
                        <OrderSummary />
                      </div>
                    </VerticalStagesItem>
                  </Content>
                  <VerticalStagesItem title="Download the Gousto app" backgroundColor="white" extraClass={css.welcomeStageContent}>
                    <AppPromo
                      device={device}
                      trackWelcomeAppPromoClick={trackWelcomeAppPromoClick}
                    />
                  </VerticalStagesItem>
                </VerticalStages>
              </div>
              <div
                className={classnames(
                  css.welcomeColInner,
                  css.mobileShow,
                  css.rafMobile
                )}
              >
                <ReferAFriend />
              </div>
              <div className={css.welcomeColInner}>
                <ProductSelection orderId={orderId} />
              </div>
            </div>
            <div className={classnames(css.colSmall, css.mobileHide)}>
              <div className={classnames(css.welcomeColInner, css.orderSummaryWrapper)}>
                <OrderSummary />
              </div>
              <div className={classnames(css.welcomeColInner)}>
                <ReferAFriend />
              </div>
            </div>
          </div>
        </div>
        <ProductDetailOverlay
          onVisibilityChange={productDetailVisibilityChange}
          open={isClient && this.isProductDetailAvailable()}
          productId={productDetailId}
        />
        <AwinPixel />
      </section>
    )
  }
}

export default Welcome
