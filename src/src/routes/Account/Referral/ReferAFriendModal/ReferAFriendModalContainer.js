import { connect } from 'react-redux'
import { userReferFriends } from 'actions/user'

import ReferAFriendModal from './ReferAFriendModal'

const mapStateToProps = () => ({})

const ReferAFriendContainer = connect(mapStateToProps, {
	userReferFriends,
})(ReferAFriendModal)

export default ReferAFriendContainer
