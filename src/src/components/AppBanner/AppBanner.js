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
  let i
  const stars = []
  const avgRounded = Math.round(avg)
  const avgFloored = Math.floor(avg)
  for (i = 0; i < avgFloored; i++) {
    stars.push(<span className={css.starFull} key={i + 1} />)
  }
  if (avgRounded > avgFloored) {
    stars.push(<span className={css.starHalf} key={avgRounded} />)
    i++
  }
  for (i; i < 5; i++) {
    stars.push(<span className={css.starEmpty} key={i + 1} />)
  }

  return stars
}

const AppBanner = ({ name, averageRating, ratings, showAppBanner, appBannerDismiss }) => (
  showAppBanner ?
    (
      <div className={css.appBannerWrapper}>
        <button type='button' className={css.closeButton} onClick={() => appBannerDismiss()}>
          <Svg fileName="icon-times" className={css.closeIcon} />
        </button>
        <div className={css.appDetails}>
          <div className={css.appIcon}><Svg fileName="icon-gousto-iso" className={css.appIconLogo} /></div>
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
          <Button noDecoration>Get the app</Button>
        </a>
      </div>
    ) : null
)

AppBanner.propTypes = propTypes

export { AppBanner }
