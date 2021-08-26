import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import OrderSummary from 'containers/welcome/OrderSummary'
import { ReferAFriend } from '../OrderConfirmation/components/ReferAFriend'
import { AwinPixelContainer } from './AwinPixel'
import css from './Welcome.css'
import { AppPromo } from './AppPromo'
import { OrderSchedule } from './OrderSchedule'

const propTypes = {
  device: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string,
  }).isRequired,
  query: PropTypes.shape({
    var: PropTypes.string,
  }).isRequired,
  trackWelcomeAppPromoClick: PropTypes.func.isRequired,
  userFetchReferralOffer: PropTypes.func.isRequired,
}

class Welcome extends React.PureComponent {
  componentDidMount() {
    const { query = {}, params = {}, userFetchReferralOffer, fetchData } = this.props

    fetchData({ query, params })
    userFetchReferralOffer()
  }

  render() {
    const { device, trackWelcomeAppPromoClick, orderId } = this.props

    return (
      <section className={css.container} data-testing="welcomeContainer">
        <div className={css.contentContainer}>
          <div className={css.row}>
            <div className={css.colMedium}>
              <div className={css.welcomeColInnerContainer}>
                <OrderSchedule />
                <div className={classnames(css.welcomeColInner, css.appPromo)}>
                  <AppPromo device={device} trackWelcomeAppPromoClick={trackWelcomeAppPromoClick} />
                </div>
              </div>
              <div className={classnames(css.welcomeColInner, css.mobileShow, css.rafMobile)}>
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
        <AwinPixelContainer orderId={orderId} />
      </section>
    )
  }
}

Welcome.propTypes = propTypes

export { Welcome }
