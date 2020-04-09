import { connect } from 'react-redux'
import { userReferAFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { ReferAFriend } from './ReferAFriend.logic'

const ReferAFriendContainer = connect(null, {
  userReferAFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)

export default ReferAFriendContainer

