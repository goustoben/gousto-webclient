import React from 'react'
import css from './Notification.css'

const Notification = ({ type, title, message, url, icon }) => (
  <div className={`${css.notificationPanel} ${css[type]}`}>
    <a href={url} className={css.notificationLink}>
      <span>{icon}</span>
      <span className={css.notificationTitle}>{title} </span>
      <span className={css.notificationMessage}>{message}</span>
    </a>
  </div>
)

export { Notification }
