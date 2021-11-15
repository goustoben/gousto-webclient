import { connect } from 'react-redux'

import { getReferralOffer, getReferralCode, getUserFirstName, getLoadingStateForOffer } from 'selectors/user'

import { Referral } from './Referral'
import { trackUserFreeFoodPageView } from "actions/loggingmanager/trackUserFreeFoodPageView"
import { trackUserFreeFoodLinkShare } from "actions/loggingmanager/trackUserFreeFoodLinkShare"
import { userFetchReferralOffer } from "actions/user/userFetchReferralOffer"
import { trackingReferFriend } from "actions/user/trackingReferFriend"
import { trackingReferFriendSocialSharing } from "actions/user/trackingReferFriendSocialSharing"

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
  isLoading: getLoadingStateForOffer(state),
  device: state.request.get('browser')
})

const ReferralContainer = connect(mapStateToProps, {
  userFetchReferralOffer,
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  trackUserFreeFoodPageView,
  trackUserFreeFoodLinkShare,
})(Referral)

export { ReferralContainer }
