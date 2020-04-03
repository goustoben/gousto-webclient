import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import actions from 'actions'
import logger from 'utils/logger'
import userUtils from 'utils/user'

import OrderSummary from 'containers/welcome/OrderSummary'
import { ReferAFriend } from '../OrderConfirmation/components/ReferAFriend'
import { AwinPixel } from './AwinPixel'
import css from './Welcome.experiment.css'
import { AppPromoExperiment as AppPromo } from './AppPromo'
import { OrderSchedule } from './OrderSchedule'

const propTypes = {
  productDetailId: PropTypes.string.isRequired,
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
  device: PropTypes.string.isRequired,
  userFetchReferralOffer: PropTypes.func.isRequired,
  trackWelcomeAppPromoClick: PropTypes.func.isRequired,
  query: PropTypes.shape({
    var: PropTypes.string
  }).isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string
  }).isRequired,
}

const contextTypes = {
  store: PropTypes.object.isRequired
}

class Welcome extends React.PureComponent {
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

  componentDidMount() {
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
    const {
      device,
      trackWelcomeAppPromoClick,
    } = this.props

    return (
      <section className={css.container} data-testing="welcomeContainer">
        <div className={css.contentContainer}>
          <div className={css.row}>
            <div className={css.colMedium}>
              <div className={css.welcomeColInnerVerticalStages}>
                <OrderSchedule />
                <div className={classnames(css.welcomeColInner, css.appPromo)}>
                  <AppPromo
                    device={device}
                    trackWelcomeAppPromoClick={trackWelcomeAppPromoClick}
                  />
                </div>
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
        <AwinPixel />
      </section>
    )
  }
}

Welcome.propTypes = propTypes
Welcome.contextTypes = contextTypes

export { Welcome }
