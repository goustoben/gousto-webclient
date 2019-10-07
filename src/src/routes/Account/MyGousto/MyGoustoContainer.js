import { connect } from 'react-redux'
import actions from 'actions'
import { userGetReferralDetails } from 'actions/user'
import MyGousto from './MyGousto'

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
    nameFirst: state.user.get('nameFirst'),
    referralDetails: state.user.get('referralDetails'),
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrders: actions.userLoadOrders,
  userGetReferralDetails
})(MyGousto)

export default MyGoustoContainer
