import { connect } from 'react-redux'
import Account from './Account'

function mapStateToProps(state) {
	return {
		rateRecipeCount: state.user.get('rateCount'),
		cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
	}
}

const AccountContainer = connect(mapStateToProps, {})(Account)

export default AccountContainer
