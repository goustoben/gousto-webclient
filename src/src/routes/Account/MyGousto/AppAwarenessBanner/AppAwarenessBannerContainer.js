import { connect } from 'react-redux'
import { getUserPhoneWithoutLeadingZero } from 'selectors/user'
import {
  getGoustoAppEventName,
  getEventErrorMessage,
  showEventPending,
  showEventSent
} from 'selectors/loggingmanager'
import { AppAwarenessBanner } from './AppAwarenessBanner'
import { sendGoustoAppLinkSMS } from "actions/loggingmanager/sendGoustoAppLinkSMS"

const mapStateToProps = (state) => ({
  goustoAppEventName: getGoustoAppEventName(),
  eventErrorMessage: getEventErrorMessage(state),
  showEventPending: showEventPending(state),
  showEventSent: showEventSent(state),
  initialUserPhoneNumber: getUserPhoneWithoutLeadingZero(state),
})

const AppAwarenessBannerContainer = connect(mapStateToProps, {
  sendGoustoAppLinkSMS,
})(AppAwarenessBanner)

export {
  AppAwarenessBannerContainer
}
