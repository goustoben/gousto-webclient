import { connect } from 'react-redux'
import { trackNotificationLinkClick } from '../actions/tracking'
import { NotificationLogic } from './Notification.logic'

export const NotificationContainer = connect(null, {
  trackNotificationLinkClick
})(NotificationLogic)
