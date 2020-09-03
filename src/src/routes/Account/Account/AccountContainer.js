import { connect } from 'react-redux'
import { isAccountTabNameTest } from 'selectors/features'
import userActions from 'actions/user'
import subscriptionActions from 'actions/subscriptionPause'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import Account from './Account'

function mapStateToProps(state) {
  return {
    rateRecipeCount: state.user.get('rateCount'),
    cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
    isAccountTabNameTest: isAccountTabNameTest(state),
  }
}

const AccountContainer = connect(
  mapStateToProps,
  {
    loadMenuServiceDataIfDeepLinked,
    userLoadData: userActions.userLoadData,
    userRecipeRatings: userActions.userRecipeRatings,
    checkCardExpiry: userActions.checkCardExpiry,
    subscriptionLoadData: subscriptionActions.subscriptionLoadData,
  }
)(Account)

export default AccountContainer
