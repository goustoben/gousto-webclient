import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { VerticalStages, VerticalStagesItem } from 'goustouicomponents'

import Content from 'containers/Content'

import OrderSummary from 'containers/welcome/OrderSummary'
import ProductSelection from 'containers/welcome/ProductSelection'
import { RibbonTriggerContainer } from 'RibbonTrigger'
import { ReferAFriend } from '../OrderConfirmation/components/ReferAFriend'
import ProductDetailOverlay from './ProductDetailOverlay'
import { AwinPixelContainer } from './AwinPixel'
import css from './Welcome.css'
import { AppPromo } from './AppPromo'

const propTypes = {
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
  fetchData: PropTypes.func.isRequired,
}

class Welcome extends React.PureComponent {
  state = {
    isClient: false
  }

  componentDidMount() {
    this.setState({ isClient: true }) // eslint-disable-line react/no-did-mount-set-state

    const { query = {}, params = {}, userFetchReferralOffer, fetchData } = this.props

    fetchData({ query, params })
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
        <AwinPixelContainer orderId={orderId} />
        <RibbonTriggerContainer name="control_welcome" />
      </section>
    )
  }
}

Welcome.propTypes = propTypes

export default Welcome
