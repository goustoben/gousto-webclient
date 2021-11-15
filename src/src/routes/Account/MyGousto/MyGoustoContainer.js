import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getBrowserType } from 'selectors/browser'
import {
  getIsCustomNoticeEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
  getLimitedCapacity,
} from 'selectors/features'
import { track3dsCompliantClick } from './actions/tracking'
import { MyGousto } from './MyGousto'
import { redirect } from "actions/redirect/redirect"
import { userGetReferralDetails } from "actions/user/userGetReferralDetails"
import { userCheck3dsCompliantToken } from "actions/user/userCheck3dsCompliantToken"
import { userReset3dsCompliantToken } from "actions/user/userReset3dsCompliantToken"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { trackClickRateRecipes } from "routes/Ratings/actions/feedback/trackClickRateRecipes"

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
    nameFirst: state.user.get('nameFirst'),
    referralDetails: state.user.get('referralDetails'),
    isCapacityLimited: getLimitedCapacity(state),
    isCustomNoticeEnabled: getIsCustomNoticeEnabled(state),
    isMobileViewport: getBrowserType(state) === 'mobile',
    showAppAwareness: getIsMyGoustoBannerAppAwarenessEnabled(state),
    rateRecipeCount: state.feedback.get('feedbackCount'),
    goustoRef: state.user.get('goustoReference'),
    isCardTokenNotCompliantFor3ds: state.payment.get('isCardTokenNotCompliantFor3ds'),
    pending: state.pending.get(actionTypes.USER_GET_3DS_COMPLIANT_TOKEN, false),
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrders,
  userGetReferralDetails,
  redirect,
  trackClickRateRecipes,
  userCheck3dsCompliantToken,
  userReset3dsCompliantToken,
  track3dsCompliantClick,
})(MyGousto)

export { MyGoustoContainer }
