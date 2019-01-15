import { connect } from 'react-redux'
import { getReferralOffer, getUserFirstName } from 'selectors/user'
import { trackingReferFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { ShareYourLinkModal } from './ShareYourLinkModal'

const mapStateToProps = (state) => ({
  userFirstName: getUserFirstName(state),
  rafOffer: getReferralOffer(state),
})

const ShareYourLinkModalContainer = connect(mapStateToProps, {
  trackingReferFriend,
  trackingReferFriendSocialSharing,
})(ShareYourLinkModal)

export default ShareYourLinkModalContainer

