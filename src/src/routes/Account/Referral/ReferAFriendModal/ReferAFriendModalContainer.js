import { connect } from 'react-redux'
import { userReferAFriend } from 'actions/user'

import { ReferAFriendModal } from './ReferAFriendModal'

const mapStateToProps = () => ({})

const ReferAFriendContainer = connect(mapStateToProps, {
  userReferAFriend,
})(ReferAFriendModal)

export default ReferAFriendContainer
