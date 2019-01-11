import { connect } from 'react-redux'
import { trackingReferFriendSocialSharing } from 'actions/user'

import { ShareYourLinkModal } from './ShareYourLinkModal'

const mapStateToProps = () => ({})

const ShareYourLinkModalContainer = connect(mapStateToProps, {
  trackingReferFriendSocialSharing,
})(ShareYourLinkModal)

export default ShareYourLinkModalContainer

