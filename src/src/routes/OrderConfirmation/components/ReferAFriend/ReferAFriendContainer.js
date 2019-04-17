import { connect } from 'react-redux'
import Immutable from 'immutable'
import { trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'
import { getReferralOffer, getReferralCode, getUserFirstName } from 'selectors/user'
import { ReferAFriend } from './ReferAFriend'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state) || Immutable.Map(),
  device: state.request.get('browser')
})

export const ReferAFriendContainer = connect(mapStateToProps, {
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)
