import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Overlay from 'Overlay'
import Loading from 'Loading'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import { OrderConfirmationHeader } from './components/OrderConfirmationHeader'
import { ReferAFriend } from './components/ReferAFriend'
import { AwinPixel } from './components/AwinPixel'
import { Market } from './components/Market'
import css from './OrderConfirmation.css'

const propTypes = {
  showHeader: PropTypes.bool.isRequired,
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
  ageVerified: PropTypes.bool.isRequired,
}

const defaultProps = {
  showHeader: false,
  headerDetails: {},
}

class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      hasConfirmedAge: false,
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
      headerDetails,
      showHeader,
      ageVerified,
      isLoading,
    } = this.props
    const { showAgeVerification, hasConfirmedAge } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified

    return isLoading ?
      (
        <div className={css.loadingContainer}>
          <Loading />
        </div>
      ) :
      (
        <div data-testing="orderConfirmationContainer">
          {showHeader && <OrderConfirmationHeader
            {...headerDetails}
          />}
          <Overlay open={showAgeVerification} from="top">
            <AgeVerificationPopUp
              onClose={this.toggleAgeVerificationPopUp}
              isUnderAge={isUnderAge}
              onAgeConfirmation={this.onAgeConfirmation}
            />
          </Overlay>
          <div className={classnames(css.mobileShow, css.rafMobile)}>
            <ReferAFriend />
          </div>
          <h3 className={css.marketPlaceTitle}>Gousto Market</h3>
          <Market
            ageVerified={ageVerified}
            toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
          />
          <AwinPixel />
        </div>
      )
  }
}

OrderConfirmation.propTypes = propTypes
OrderConfirmation.defaultProps = defaultProps

export { OrderConfirmation }
