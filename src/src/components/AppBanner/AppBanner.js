import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import Svg from 'Svg'
import css from './AppBanner.css'

const propTypes = {
  name: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
  ratings: PropTypes.string.isRequired,
  showAppBanner: PropTypes.bool.isRequired,
  appBannerDismiss: PropTypes.func.isRequired,
}

const showStar = (avg) => {
  const stars = Array(5)
  const avgRounded = Math.round(avg)
  const avgFloored = Math.floor(avg)
  const noOfFullStars = Math.round(avg - 0.25)
  const noOfHalfStars = (avg - noOfFullStars > 0.25 && avg - noOfFullStars < 0.75 && noOfFullStars < 5) ? 1 : 0
  const noOfEmptyStars = 5 - noOfFullStars - noOfHalfStars

  stars.fill(<span className={css.starFull} />, 0, noOfFullStars)
  stars.fill(<span className={css.starHalf} key={avgRounded} />, noOfFullStars, noOfFullStars + noOfHalfStars)
  stars.fill(<span className={css.starEmpty} />, noOfFullStars + noOfHalfStars, 5)

  return stars
}

const AppBanner = ({ name, averageRating, ratings, showAppBanner, appBannerDismiss }) => (
  showAppBanner ?
    (
      <div className={css.appBannerWrapper}>
        <button type='button' className={css.closeButton} onClick={() => appBannerDismiss()}>
          <Svg fileName="icon_dismiss-app-banner" className={css.closeIcon} />
        </button>
        <div className={css.appDetails}>
          <Svg fileName="app-banner-app-icon" className={css.appIcon} />
          <div className={css.platformSpecificDetails}>
            <strong>{`Gousto for ${name}`}</strong>
            <div className={css.rating}>
              <span className={css.stars}>
                {showStar(averageRating)}
              </span>
              <span>{`(${ratings})`}</span>
            </div>
          </div>
        </div>
        <a className={css.appLink} href="https://gousto.co.uk/apps">
          <Button noDecoration>Get app</Button>
        </a>
      </div>
    ) : null
)

AppBanner.propTypes = propTypes

export { AppBanner }
