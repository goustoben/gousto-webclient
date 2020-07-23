import { connect } from 'react-redux'
import { userLoadOrderTrackingInfo } from 'actions/user'
import {
  trackNextBoxTrackingClick,
} from 'actions/myGousto'
import {
  trackOrderNotEligibleForSelfServiceResolutionClick,
  trackOrderEligibleForSelfServiceResolutionClick,
} from '../actions/tracking'
import { Header } from './Header.logic'

const mapStateToProps = state => ({
  accessToken: state.auth.get('accessToken'),
  nextOrderTracking: state.user.get('nextOrderTracking'),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  trackNextBoxTrackingClick,
  trackOrderNotEligibleForSelfServiceResolutionClick,
  trackOrderEligibleForSelfServiceResolutionClick,
})(Header)
