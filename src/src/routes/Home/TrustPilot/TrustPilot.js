import React from 'react'
import { trustPilotReviews } from 'config/home'
import css from './TrustPilot.css'

const TrustPilot = () => (
  <div className={css.trustPilotContainer}>
    <div className={css.leftSeedsArea} />
    <div className={css.textContainer}>
      <p className={css.deliveredMeals}>
        Over
        <span className={css.goustoRedColor}> 100 million meals </span>
        delivered so far
      </p>
      <div className={css.reviewContainer}>
        <div className={css.starsContainer}>
          <div className={css.reviewStar} />
          <div className={css.trustPilot}>Trustpilot</div>
          <div className={css.trustPilotStars} />
        </div>
        <p className={css.reviews}>
          Based on
          <span className={css.goustoRedColor}>{` ${trustPilotReviews} `}</span>
          reviews
        </p>
      </div>
    </div>
    <div className={css.rightSeedsArea} />
  </div>
)

export {
  TrustPilot
}
