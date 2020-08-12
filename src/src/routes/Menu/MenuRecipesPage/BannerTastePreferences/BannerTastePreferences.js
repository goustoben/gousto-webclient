import React from 'react'
import PropTypes from 'prop-types'
import css from './BannerTastePreferences.css'

export const BannerTastePreferences = ({ shouldBannerShow }) => {
  if (!shouldBannerShow) {
    return null
  }

  return (
    <div className={css.bannerContainer}>
      <div className={css.tasteProfileBannerContainer}>
        <span className={css.tasteProfileBannerIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 3.25C5.41421 3.25 5.75 3.58579 5.75 4V9C5.75 9.13807 5.86193 9.25 6 9.25H10C10.1381 9.25 10.25 9.13807 10.25 9V4C10.25 3.58579 10.5858 3.25 11 3.25C11.4142 3.25 11.75 3.58579 11.75 4V9C11.75 9.9665 10.9665 10.75 10 10.75H6C5.0335 10.75 4.25 9.9665 4.25 9V4C4.25 3.58579 4.58579 3.25 5 3.25Z" fill="#333D47" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8 3.25C8.41421 3.25 8.75 3.58579 8.75 4V20C8.75 20.4142 8.41421 20.75 8 20.75C7.58579 20.75 7.25 20.4142 7.25 20V4C7.25 3.58579 7.58579 3.25 8 3.25Z" fill="#333D47" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16.3059 4.24338C16.7097 3.72292 17.2782 3.25 18 3.25H18.75V20C18.75 20.4142 18.4142 20.75 18 20.75C17.5858 20.75 17.25 20.4142 17.25 20V13.75H14.25V13C14.25 10.4331 14.634 8.09784 15.2288 6.37967C15.5248 5.52448 15.8858 4.78487 16.3059 4.24338ZM17.25 12.25V5.52014C17.044 5.86577 16.8377 6.31722 16.6462 6.87033C16.1711 8.24285 15.8279 10.1235 15.7616 12.25H17.25Z" fill="#333D47" />
          </svg>
        </span>
        <p className={css.tasteProfileBannerMessage}>Here&apos;s the full menu, ordered to your preferences</p>
      </div>
    </div>
  )
}

BannerTastePreferences.propTypes = {
  shouldBannerShow: PropTypes.bool.isRequired
}
