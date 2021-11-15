import { connect } from 'react-redux'
import Immutable from 'immutable'
import { getReferralOffer, getReferralCode, getUserFirstName } from 'selectors/user'
import { ReferAFriend } from './ReferAFriend'
import { trackingReferFriend } from "actions/user/trackingReferFriend"
import { trackingReferFriendSocialSharing } from "actions/user/trackingReferFriendSocialSharing"

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state) || Immutable.Map(),
  device: state.request.get('browser'),
})

export const ReferAFriendContainer = connect(mapStateToProps, {
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)
