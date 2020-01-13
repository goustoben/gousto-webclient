import { connect } from 'react-redux'
import { isAccountTabNameTest } from 'selectors/features'
import Account from './Account'

function mapStateToProps(state) {
  return {
    rateRecipeCount: state.user.get('rateCount'),
    cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
    isAccountTabNameTest: isAccountTabNameTest(state),
  }
}

const AccountContainer = connect(mapStateToProps, {})(Account)

export default AccountContainer
