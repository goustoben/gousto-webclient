import { connect } from 'react-redux'

import { userFetchReferralOffer, trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'
import { getReferralOffer, getReferralCode, getUserFirstName, getLoadingStateForOffer } from 'selectors/user'

import { Referral } from './Referral'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
  isLoading: getLoadingStateForOffer(state)
})

const ReferralContainer = connect(mapStateToProps, {
  userFetchReferralOffer, 
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(Referral)

export default ReferralContainer
