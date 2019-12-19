import { connect } from 'react-redux'
import { userReferAFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { ReferAFriend } from './ReferAFriend.logic'

const mapStateToProps = () => ({})

const ReferAFriendContainer = connect(mapStateToProps, {
  userReferAFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)

export default ReferAFriendContainer

