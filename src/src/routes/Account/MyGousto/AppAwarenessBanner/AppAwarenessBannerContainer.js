import { connect } from 'react-redux'
import { getUserPhoneNumber } from 'selectors/user'
import { AppAwarenessBanner } from './AppAwarenessBanner'

const mapStateToProps = (state) => ({
  userPhoneNumber: getUserPhoneNumber(state),
})

const AppAwarenessBannerContainer = connect(mapStateToProps)(AppAwarenessBanner)

export {
  AppAwarenessBannerContainer
}
