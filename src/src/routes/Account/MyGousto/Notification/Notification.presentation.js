import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'goustouicomponents'
import css from './Notification.css'

const propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
}

const handleClick = (e, url, onLinkClick) => {
  e.preventDefault()
  onLinkClick()
  window.location.assign(url)
}

const NotificationPresentation = ({ type, title, message, url, onLinkClick }) => (
  <div>
    <Alert type={type}>
      <a href={url} className={css.notificationLink} onClick={e => handleClick(e, url, onLinkClick)}>
        <span className={css.notificationTitle}>{title} </span>
        <span className={css.notificationMessage}>{message}</span>
      </a>
    </Alert>
  </div>
)

NotificationPresentation.propTypes = propTypes

export { NotificationPresentation }
