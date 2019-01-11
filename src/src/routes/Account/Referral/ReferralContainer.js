import { connect } from 'react-redux'

import { userFetchReferralOffer, trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'
import { getReferralOffer, getReferralCode, getUserFirstName } from 'selectors/user'

import Referral from './Referral'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  rafOffer: getReferralOffer(state),
  userFirstName: getUserFirstName(state),
})

const ReferralContainer = connect(mapStateToProps, {
  userFetchReferralOffer, 
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(Referral)

export default ReferralContainer
