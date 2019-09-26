import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

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
  hasCollapsedRafFeature: PropTypes.bool,
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
  rafOffer: ImmutablePropTypes.mapContains({
    creditFormatted: PropTypes.string.isRequired,
    firstBoxDiscountFormatted: PropTypes.string.isRequired,
    firstMonthDiscountFormatted: PropTypes.string.isRequired,
  }).isRequired,
  showHeader: PropTypes.bool.isRequired,
  userFetchReferralOffer: PropTypes.func,
  showShortlistFeedback: PropTypes.bool
}

const defaultProps = {
  hasCollapsedRafFeature: false,
  headerDetails: {},
  showHeader: false,
  showShortlistFeedback: false
}

class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      hasConfirmedAge: false,
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
      hasCollapsedRafFeature,
      headerDetails,
      isLoading,
      rafOffer,
      showHeader,
    } = this.props
    const { showAgeVerification, hasConfirmedAge, showFeedback } = this.state
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
              <VerticalStages>
                <VerticalStagesItem
                  title="Order created"
                  isCompleted
                  backgroundColor="lightGrey"
                >
                  <div>
                    <OrderConfirmationHeader {...headerDetails} />
                    <div className={classnames(css.mobileShow, css.rafMobile)}>
                      {hasCollapsedRafFeature ?
                        <ItemExpandable
                          label={`Invite your friends, get ${rafOffer.get('creditFormatted')}`}
                        >
                          <ReferAFriend />
                        </ItemExpandable>
                        :
                        <ReferAFriend />
                      }
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
