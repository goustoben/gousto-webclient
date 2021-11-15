import { connect } from 'react-redux'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import Account from './Account'
import { userLoadData } from "actions/user/userLoadData"
import { checkCardExpiry } from "actions/user/checkCardExpiry"
import { userRecipeRatings } from "routes/Ratings/actions/feedback/userRecipeRatings"

function mapStateToProps(state) {
  return {
    cardExpiryDate: state.user.getIn(['card', 'expiryDate']),
    rateRecipeCount: state.feedback.get('feedbackCount'),
  }
}

const AccountContainer = connect(
  mapStateToProps,
  {
    loadMenuServiceDataIfDeepLinked,
    userLoadData,
    checkCardExpiry,
    userRecipeRatings,
  }
)(Account)

export default AccountContainer
