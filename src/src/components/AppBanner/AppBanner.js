import React from 'react'
import { Button } from 'goustouicomponents'
import Svg from 'Svg'
import css from './AppBanner.css'

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

const AppBanner = ({ appTitle, rating }) => (
  <div className={css.appBannerWrapper}>
    <button type='button' className={css.closeButton}>
      <Svg fileName="icon-times" className={css.closeIcon} />
    </button>
    <div className={css.appDetails}>
      <div className={css.appIcon}><Svg fileName="icon-gousto-iso" className={css.appIconLogo} /></div>
      <div className={css.platformSpecificDetails}>
        <strong>{appTitle}</strong>
        <div className={css.rating}>
          <span className={css.stars}>
            {showStar(rating)}
          </span>
          <span>(30.9K)</span>
        </div>
      </div>
    </div>
    <a className={css.appLink}>
      <Button noDecoration>Get the app</Button>
    </a>
  </div>
)

export { AppBanner }
