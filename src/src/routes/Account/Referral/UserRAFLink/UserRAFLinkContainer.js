import { connect } from 'react-redux'
import UserRAFLink from './UserRAFLink'

function mapStateToProps(state, ownProps) {
	return {
		referralCode: state.user.get('referral-code'),
		...ownProps,
	}
}

const UserRAFLinkContainer = connect(mapStateToProps, {

})(UserRAFLink)

export default UserRAFLinkContainer
