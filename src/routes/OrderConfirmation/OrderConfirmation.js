import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'
import Overlay from 'Overlay'
import { PageLoader } from 'PageLoader'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import {
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
  userFetchReferralOffer: PropTypes.func,
}

const defaultProps = {
  headerDetails: {},
  showHeader: false
}

class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      hasConfirmedAge: false,
      showAgeVerification: false
    }
  }

  componentDidMount() {
    const { userFetchReferralOffer } = this.props

    userFetchReferralOffer()
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
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
      headerDetails,
      isLoading,
      showHeader,
    } = this.props
    const { hasConfirmedAge, showAgeVerification } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified

    return isLoading ?
      (
        <PageLoader />
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
              <VerticalStages hasFullWidth>
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
                  <h3 className={css.marketPlaceTitle}>Gousto Market</h3>
                  <Market
                    ageVerified={ageVerified}
                    toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
                  />
                  <div className={classnames(css.mobileShow, css.rafMobile)}>
                    <ReferAFriend />
                  </div>
                </div>
            )}

            <AwinPixel />
          </div>
        </LayoutPageWrapper>
      )
  }
}

OrderConfirmation.propTypes = propTypes
OrderConfirmation.defaultProps = defaultProps

export { OrderConfirmation }
