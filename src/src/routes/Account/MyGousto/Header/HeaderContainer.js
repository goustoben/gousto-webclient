import { connect } from 'react-redux'
import { userLoadOrderTrackingInfo } from 'actions/user'
import {
  getIsMyGoustoBannerSubscriberPricingEnabled,
  getIsSSRVisibilityOnMyGoustoEnabled
} from 'selectors/features'
import { getUserSubscriptionState } from 'selectors/user'
import { trackNextBoxTrackingClick } from 'actions/myGousto'
import { trackClickGetHelpWithThisBox } from '../../../GetHelp/actions/getHelp'
import { Header } from './Header.logic'

const mapStateToProps = state => ({
  accessToken: state.auth.get('accessToken'),
  isSSRVisibilityOnMyGoustoEnabled: getIsSSRVisibilityOnMyGoustoEnabled(state),
  nextOrderTracking: state.user.get('nextOrderTracking'),
  showSubscriberPricingBanner: getIsMyGoustoBannerSubscriberPricingEnabled(state),
  subscriptionStatus: getUserSubscriptionState(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  trackClickGetHelpWithThisBox,
  trackNextBoxTrackingClick,
})(Header)
