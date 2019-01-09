import { connect } from 'react-redux'
import { userReferAFriend } from 'actions/user'

import { ReferAFriend } from './ReferAFriend'

const mapStateToProps = () => ({})

const ReferAFriendContainer = connect(mapStateToProps, {
  userReferAFriend,
})(ReferAFriend)

export default ReferAFriendContainer

