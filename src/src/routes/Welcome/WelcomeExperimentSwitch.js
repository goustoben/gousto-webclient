import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import WelcomeOriginal from './Welcome'
import { Welcome as WelcomeExperiment } from './Welcome.experiment'

const propTypes = {
  isWelcomePageOnboardingEnabled: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  productDetailId: PropTypes.string.isRequired,
  productDetailVisibilityChange: PropTypes.func.isRequired,
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  userFetchReferralOffer: PropTypes.func.isRequired,
  query: PropTypes.shape({
    var: PropTypes.string
  }).isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string
  }).isRequired,
  device: PropTypes.string.isRequired,
  trackWelcomeAppPromoClick: PropTypes.func.isRequired,
}

const defaultProps = {}

class WelcomeExperimentSwitch extends React.PureComponent {
  render() {
    const {
      params,
      isWelcomePageOnboardingEnabled,
      query,
      orderId,
      productDetailId,
      productDetailVisibilityChange,
      products,
      user,
      userFetchReferralOffer,
      device,
      trackWelcomeAppPromoClick,
    } = this.props
    const Welcome = isWelcomePageOnboardingEnabled ? WelcomeExperiment : WelcomeOriginal

    return (
      <Welcome
        params={params}
        query={query}
        orderId={orderId}
        productDetailId={productDetailId}
        productDetailVisibilityChange={productDetailVisibilityChange}
        products={products}
        user={user}
        userFetchReferralOffer={userFetchReferralOffer}
        device={device}
        trackWelcomeAppPromoClick={trackWelcomeAppPromoClick}
      />
    )
  }
}

WelcomeExperimentSwitch.propTypes = propTypes
WelcomeExperimentSwitch.defaultProps = defaultProps

export { WelcomeExperimentSwitch }
