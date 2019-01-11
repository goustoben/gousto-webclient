import { connect } from 'react-redux'
import { userReferAFriend, trackingReferFriendLinkShared } from 'actions/user'

import { ReferAFriend } from './ReferAFriend.logic'

const mapStateToProps = () => ({})

const ReferAFriendContainer = connect(mapStateToProps, {
  userReferAFriend,
  trackingReferFriendLinkShared,
})(ReferAFriend)

export default ReferAFriendContainer

