import { connect } from 'react-redux'
import { getUserPhoneWithoutLeadingZero } from 'selectors/user'
import {
  getGoustoAppEventName,
  getEventErrorMessage,
  showEventPending,
  showEventSent
} from 'selectors/loggingmanager'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { sendGoustoAppLinkSMS } from 'actions/loggingmanager'
import { LoginDesktop } from './LoginDesktop'

const mapStateToProps = (state) => ({
  goustoAppEventName: getGoustoAppEventName(),
  eventErrorMessage: getEventErrorMessage(state),
  showEventPending: showEventPending(state),
  showEventSent: showEventSent(state),
  initialUserPhoneNumber: getUserPhoneWithoutLeadingZero(state),
  showAppAwareness: getIsAppAwarenessLoginEnabled(state)
})

const LoginDesktopContainer = connect(mapStateToProps, {
  sendGoustoAppLinkSMS,
})(LoginDesktop)

export {
  LoginDesktopContainer
}
