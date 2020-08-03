import { connect } from 'react-redux'

import { productDetailVisibilityChange } from 'actions/products'
import { userFetchReferralOffer } from 'actions/user'
import { trackWelcomeAppPromoClick } from 'actions/welcome'
import { updateUserTasteProfile } from 'actions/tastePreferences'

import { getIsWelcomePageOnboardingEnabled } from 'selectors/features'

import { WelcomeExperimentSwitch } from './WelcomeExperimentSwitch'

function mapStateToProps(state, ownProps) {
  const { products, user, request } = state
  const { params, location, query } = ownProps

  return ({
    orderId: params.orderId,
    productDetailId: (location && location.query) ? location.query.productDetailId : '',
    products,
    user,
    device: request.get('browser'),
    query,
    isWelcomePageOnboardingEnabled: getIsWelcomePageOnboardingEnabled(state),
  })
}

const WelcomeContainer = connect(mapStateToProps, {
  productDetailVisibilityChange,
  userFetchReferralOffer,
  trackWelcomeAppPromoClick,
  updateUserTasteProfile
})(WelcomeExperimentSwitch)

export { WelcomeContainer }
