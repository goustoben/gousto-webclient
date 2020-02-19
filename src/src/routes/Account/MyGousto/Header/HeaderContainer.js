import { connect } from 'react-redux'
import { userLoadOrderTrackingInfo } from 'actions/user'
import {
  trackNextBoxTrackingClick,
  trackOrderNotEligibleForSelfServiceResolutionClick
} from 'actions/myGousto'
import { Header } from './Header.logic'

const mapStateToProps = state => ({
  accessToken: state.auth.get('accessToken'),
  nextOrderTracking: state.user.get('nextOrderTracking'),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  trackNextBoxTrackingClick,
  trackOrderNotEligibleForSelfServiceResolutionClick,
})(Header)
