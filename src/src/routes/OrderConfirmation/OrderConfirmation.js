import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'
import { FeedbackModal } from 'FeedbackModal'
import Overlay from 'Overlay'
import Loading from 'Loading'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import {
  ItemExpandable,
  LayoutPageWrapper,
  VerticalStages,
  VerticalStagesItem,
} from 'goustouicomponents'
import { OrderConfirmationHeader } from './components/OrderConfirmationHeader'
import { ReferAFriend } from './components/ReferAFriend'
import { AwinPixel } from './components/AwinPixel'
import { Market } from './components/Market'

import css from './OrderConfirmation.css'

const propTypes = {
  ageVerified: PropTypes.bool.isRequired,
  hasProductList2Columns: PropTypes.bool,
  headerDetails: PropTypes.oneOfType([
    PropTypes.shape({
      deliveryDate: PropTypes.string,
      deliveryStart: PropTypes.string,
      deliveryEnd: PropTypes.string,
      whenCutoffTime: PropTypes.string,
      whenCutoffDate: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  rafOffer: PropTypes.instanceOf(Immutable.Map).isRequired,
  showHeader: PropTypes.bool.isRequired,
  showShortlistFeedback: PropTypes.bool,
  userFetchReferralOffer: PropTypes.func,
}

const defaultProps = {
  hasProductList2Columns: false,
  headerDetails: {},
  showHeader: false,
  showShortlistFeedback: false,
}

class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      hasConfirmedAge: false,
      showAgeVerification: false,
      showFeedback: false
    }
  }

  componentDidMount() {
    const { userFetchReferralOffer } = this.props

    userFetchReferralOffer()
  }

  componentDidUpdate(prevProps) {
    const { isLoading, showShortlistFeedback } = this.props
    if (showShortlistFeedback && !isLoading && prevProps.isLoading) {
      this.toggleShortlistFeedback()
    }
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
    }))
  }

  toggleShortlistFeedback = () => {
    this.setState((prevState) => ({
      showFeedback: !prevState.showFeedback
    }))
  }

  onAgeConfirmation = (isOver18) => {
    const { userVerifyAge } = this.props
    this.setState({
      hasConfirmedAge: true,
    })
    userVerifyAge(isOver18, true)
  }

  render() {
    const {
      ageVerified,
      hasProductList2Columns,
      headerDetails,
      isLoading,
      rafOffer,
      showHeader,
    } = this.props
    const { hasConfirmedAge, showAgeVerification, showFeedback } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified

    return isLoading ?
      (
        <div className={css.loadingContainer}>
          <Loading className={css.loadingImage} />
        </div>
      ) :
      (
        <LayoutPageWrapper padding='large-screens-only'>
          <div
            className={css.pageContent}
            data-testing="orderConfirmationContainer"
          >
            <Overlay open={showAgeVerification} from="top">
              <AgeVerificationPopUp
                onClose={this.toggleAgeVerificationPopUp}
                isUnderAge={isUnderAge}
                onAgeConfirmation={this.onAgeConfirmation}
              />
            </Overlay>

            {showHeader ? (
              <VerticalStages hasFullWidth={hasProductList2Columns}>
                <VerticalStagesItem
                  title="Order created"
                  isCompleted
                  backgroundColor="lightGrey"
                >
                  <div>
                    <OrderConfirmationHeader {...headerDetails} />
                    <div className={classnames(css.mobileShow, css.rafMobile)}>
                      <ReferAFriend />
                    </div>
                  </div>
                </VerticalStagesItem>

                <VerticalStagesItem
                  title='Add desserts, drinks, snacks & more from the Gousto Market'
                  isCompleted={false}
                >
                  <Market
                    ageVerified={ageVerified}
                    toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
                  />
                </VerticalStagesItem>
              </VerticalStages>
            ) : (
                <div>
                  <div className={classnames(css.mobileShow, css.rafMobile)}>
                    <ReferAFriend />
                  </div>
                  <h3 className={css.marketPlaceTitle}>Gousto Market</h3>
                  <Market
                    ageVerified={ageVerified}
                    toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
                  />
                </div>
            )}

            <AwinPixel />
            <Overlay open={showFeedback}>
              <FeedbackModal closeModal={() => this.toggleShortlistFeedback()} />
            </Overlay>
          </div>
        </LayoutPageWrapper>
      )
  }
}

OrderConfirmation.propTypes = propTypes
OrderConfirmation.defaultProps = defaultProps

export { OrderConfirmation }
