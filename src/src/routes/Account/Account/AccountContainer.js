import { connect } from 'react-redux'
import { getIsNewSubscriptionPageEnabled } from 'selectors/features'
import userActions from 'actions/user'
import { userRecipeRatings } from '../../Ratings/actions/feedback'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import Account from './Account'

function mapStateToProps(state) {
  return {
    cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
    isNewSubscriptionPageEnabled: getIsNewSubscriptionPageEnabled(state),
    rateRecipeCount: state.feedback.get('feedbackCount'),
  }
}

const AccountContainer = connect(
  mapStateToProps,
  {
    loadMenuServiceDataIfDeepLinked,
    userLoadData: userActions.userLoadData,
    checkCardExpiry: userActions.checkCardExpiry,
    userRecipeRatings,
  }
)(Account)

export default AccountContainer
