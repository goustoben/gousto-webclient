import { connect } from 'react-redux'
import { getUserPhoneWithoutLeadingZero } from 'selectors/user'
import {
  getGoustoAppEventName,
  getEventErrorMessage,
  showEventPending,
  showEventSent
} from 'selectors/loggingmanager'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { LoginDesktop } from './LoginDesktop'
import { sendGoustoAppLinkSMS } from "actions/loggingmanager/sendGoustoAppLinkSMS"

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
