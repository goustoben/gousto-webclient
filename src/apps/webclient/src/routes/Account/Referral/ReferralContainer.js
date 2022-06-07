import { connect } from 'react-redux'

import { userFetchReferralOffer, trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'
import { trackUserFreeFoodPageView, trackUserFreeFoodLinkShare } from 'actions/loggingmanager'
import { getReferralOffer, getReferralCode, getUserFirstName, getLoadingStateForOffer } from 'selectors/user'

import { Referral } from './Referral'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
  isLoading: getLoadingStateForOffer(state),
  device: state.request.get('browser'),
  userId: state.user.get('id'),
})

const ReferralContainer = connect(mapStateToProps, {
  userFetchReferralOffer,
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  trackUserFreeFoodPageView,
  trackUserFreeFoodLinkShare,
})(Referral)

export { ReferralContainer }
