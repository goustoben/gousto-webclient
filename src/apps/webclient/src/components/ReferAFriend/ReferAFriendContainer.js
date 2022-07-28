import { connect } from 'react-redux'
import { userReferAFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { ReferAFriend } from './ReferAFriend.logic'

export const ReferAFriendContainer = connect(null, {
  userReferAFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)
