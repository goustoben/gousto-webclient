import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'goustouicomponents'
import css from './Notification.css'

const propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

const NotificationPresentation = ({ type, title, message, url }) => (
  <div>
    <Alert type={type}>
      <a href={url} className={css.notificationLink}>
        <span className={css.notificationTitle}>{title} </span>
        <span className={css.notificationMessage}>{message}</span>
      </a>
    </Alert>
  </div>
)

NotificationPresentation.propTypes = propTypes

export { NotificationPresentation }
