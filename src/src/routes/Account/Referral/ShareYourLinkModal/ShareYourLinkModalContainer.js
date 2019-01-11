import { connect } from 'react-redux'
import { trackingReferFriendLinkShare } from 'actions/user'

import { ShareYourLinkModal } from './ShareYourLinkModal'

const mapStateToProps = () => ({})

const ShareYourLinkModalContainer = connect(mapStateToProps, {
  trackingReferFriendLinkShare,
})(ShareYourLinkModal)

export default ShareYourLinkModalContainer

