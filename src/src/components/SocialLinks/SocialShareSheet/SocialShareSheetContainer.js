import { connect } from 'react-redux'
import { getReferralOffer, getUserFirstName } from 'selectors/user'
import { trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { SocialShareSheet } from './SocialShareSheet'

const mapStateToProps = (state) => ({
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
  device: state.request.get('browser')
})

const SocialShareSheetContainer = connect(mapStateToProps, {
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(SocialShareSheet)

export default SocialShareSheetContainer

