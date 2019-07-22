import React from 'react'
import PropTypes from 'prop-types'
import css from './Notification.css'

const propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

const Notification = ({ type, title, message, url, icon }) => (
  <div>
    <div className={`${css.notificationPanel} ${css[type]}`}>
      <a href={url} className={css.notificationLink}>
        <span>{icon}</span>
        <span className={css.notificationTitle}>{title} </span>
        <span className={css.notificationMessage}>{message}</span>
      </a>
    </div>
  </div>
)

Notification.propTypes = propTypes

export { Notification }
