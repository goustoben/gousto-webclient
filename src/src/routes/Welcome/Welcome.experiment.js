import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'

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
  fetchData: PropTypes.func.isRequired,
}

class Welcome extends React.PureComponent {
  componentDidMount() {
    const { query = {}, params = {}, userFetchReferralOffer, fetchData } = this.props

    fetchData({ query, params })
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

export { Welcome }
