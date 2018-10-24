import { connect } from 'react-redux'
import ReferAFriendModal from './ReferAFriendModal'

function mapStateToProps(state, ownProps) {
	return {
		accessToken: state.auth.get('accessToken'),
		...ownProps,
	}
}

const ReferAFriendContainer = connect(mapStateToProps, {

})(ReferAFriendModal)

export default ReferAFriendContainer
