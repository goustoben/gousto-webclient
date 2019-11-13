import { connect } from 'react-redux'
import { userLoadOrderTrackingInfo } from 'actions/user'
import { Header } from './Header.logic'

const mapStateToProps = state => ({
  nextOrderTracking: state.user.get('nextOrderTracking'),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
})(Header)
