import { connect } from 'react-redux'
import { getIsNewSubscriptionPageEnabled } from 'selectors/features'
import userActions from 'actions/user'
import subscriptionActions from 'actions/subscriptionPause'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import Account from './Account'

function mapStateToProps(state) {
  return {
    cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
    isNewSubscriptionPageEnabled: getIsNewSubscriptionPageEnabled(state)
  }
}

const AccountContainer = connect(
  mapStateToProps,
  {
    loadMenuServiceDataIfDeepLinked,
    userLoadData: userActions.userLoadData,
    checkCardExpiry: userActions.checkCardExpiry,
    subscriptionLoadData: subscriptionActions.subscriptionLoadData,
  }
)(Account)

export default AccountContainer
