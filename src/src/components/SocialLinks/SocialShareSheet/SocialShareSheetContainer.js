import { connect } from 'react-redux'
import { getReferralOffer, getUserFirstName } from 'selectors/user'

import { SocialShareSheet } from './SocialShareSheet'
import { trackUserFreeFoodLinkShare } from "actions/loggingmanager/trackUserFreeFoodLinkShare"
import { trackingReferFriend } from "actions/user/trackingReferFriend"
import { trackingReferFriendSocialSharing } from "actions/user/trackingReferFriendSocialSharing"

const mapStateToProps = (state) => ({
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
  device: state.request.get('browser')
})

const SocialShareSheetContainer = connect(mapStateToProps, {
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  trackUserFreeFoodLinkShare,
})(SocialShareSheet)

export default SocialShareSheetContainer

