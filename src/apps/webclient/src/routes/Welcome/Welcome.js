import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { VerticalStages, VerticalStagesItem } from 'goustouicomponents'
import { OrderConfirmationHeader } from 'routes/OrderConfirmation/components/OrderConfirmationHeader'
import ProductSelection from 'containers/welcome/ProductSelection'
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
  isGoustoOnDemandEnabled: PropTypes.bool,
  orderDetails: PropTypes.shape({
    deliveryDate: PropTypes.string,
    deliveryStart: PropTypes.string,
    deliveryEnd: PropTypes.string,
    whenCutoffTime: PropTypes.string,
    whenCutoffDate: PropTypes.string
  }),
}

const defaultProps = {
  isGoustoOnDemandEnabled: false,
  orderDetails: null,
}

class Welcome extends React.PureComponent {
  componentDidMount() {
    const { query = {}, params = {}, userFetchReferralOffer, fetchData } = this.props

    fetchData({ query, params })
    userFetchReferralOffer()
  }

  render() {
    const { device, trackWelcomeAppPromoClick, orderId, isGoustoOnDemandEnabled, orderDetails } = this.props
    const { deliveryDate, deliveryEnd, deliveryStart, whenCutoffDate, whenCutoffTime } = orderDetails

    return (
      <section className={css.container} data-testing="welcomeContainer">
        <div className={classnames(css.contentContainer, { [css.goustoOnDemandContainer]: isGoustoOnDemandEnabled })}>
          <div className={css.row}>
            {!isGoustoOnDemandEnabled
              ? (
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
              )
              : (
                <div className={css.welcomeCol}>
                  <VerticalStages hasFullWidth={false}>
                    <VerticalStagesItem
                      title="Order created"
                      isCompleted
                      backgroundColor="lightGrey"
                    >
                      {orderDetails && (
                        <OrderConfirmationHeader
                          deliveryDate={deliveryDate}
                          deliveryEnd={deliveryEnd}
                          deliveryStart={deliveryStart}
                          whenCutoffDate={whenCutoffDate}
                          whenCutoffTime={whenCutoffTime}
                        />
                      )}
                    </VerticalStagesItem>
                    <VerticalStagesItem
                      title="Add desserts, drinks, snacks & more from the Gousto Market"
                      isCompleted={false}
                    >
                      <p>Additional charges will apply for Gousto Market items.</p>
                      <ProductSelection orderId={orderId} isGoustoOnDemandEnabled />
                    </VerticalStagesItem>
                  </VerticalStages>
                </div>
              )}

            {!isGoustoOnDemandEnabled && (
              <div className={classnames(css.colSmall, css.mobileHide)}>
                <div className={classnames(css.welcomeColInner, css.orderSummaryWrapper)}>
                  <OrderSummary />
                </div>
                <div className={classnames(css.welcomeColInner)}>
                  <ReferAFriend />
                </div>
              </div>
            )}
          </div>
        </div>
        <AwinPixelContainer orderId={orderId} />
      </section>
    )
  }
}

Welcome.propTypes = propTypes
Welcome.defaultProps = defaultProps

export { Welcome }
