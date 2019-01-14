import { connect } from 'react-redux'
import { trackingReferFriendSocialSharing } from 'actions/user'
import { getUserFirstName } from 'selectors/user'

import { ShareYourLinkModal } from './ShareYourLinkModal'

const mapStateToProps = (state) => ({
  userFirstName: getUserFirstName(state),
})

const ShareYourLinkModalContainer = connect(mapStateToProps, {
  trackingReferFriendSocialSharing,
})(ShareYourLinkModal)

export default ShareYourLinkModalContainer

