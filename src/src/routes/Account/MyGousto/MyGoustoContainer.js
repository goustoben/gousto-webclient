import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { userGetReferralDetails, userCheck3dsCompliantToken, userReset3dsCompliantToken } from 'actions/user'
import { redirect } from 'actions/redirect'
import { getBrowserType } from 'selectors/browser'
import {
  getIsCustomNoticeEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
} from 'selectors/features'
import { track3dsCompliantClick } from './actions/tracking'
import { MyGousto } from './MyGousto'
import { trackClickRateRecipes } from '../../Ratings/actions/feedback'

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
    nameFirst: state.user.get('nameFirst'),
    referralDetails: state.user.get('referralDetails'),
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
  userLoadOrders: actions.userLoadOrders,
  userGetReferralDetails,
  redirect,
  trackClickRateRecipes,
  userCheck3dsCompliantToken,
  userReset3dsCompliantToken,
  track3dsCompliantClick,
})(MyGousto)

export { MyGoustoContainer }
