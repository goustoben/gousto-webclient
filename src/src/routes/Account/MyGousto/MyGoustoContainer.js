import { connect } from 'react-redux'
import actions from 'actions'
import { userGetReferralDetails } from 'actions/user'
import { redirect } from 'actions/redirect'
import { getLimitedCapacity } from 'selectors/features'
import { MyGousto } from './MyGousto'

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
    nameFirst: state.user.get('nameFirst'),
    referralDetails: state.user.get('referralDetails'),
    isCapacityLimited: getLimitedCapacity(state),
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrders: actions.userLoadOrders,
  userGetReferralDetails,
  redirect
})(MyGousto)

export { MyGoustoContainer }
