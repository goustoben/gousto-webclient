import React from 'react'
import PropTypes from 'prop-types'

import css from './DoubleCreditCountdown.css'

const proptypes = {
  title: PropTypes.string.isRequired,
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
}

const DoubleCreditCountdownPresentation = ({title, days, hours, minutes}) => (
  <div className={css.countdownWrapper}>
    <h1>{title} Hurry up, offer expires in:</h1>
    <div className={css.countdown}>
      <div className={css.countdownUnit}>
        <h2>{days}</h2>
        <p>Days</p>
      </div>
      <div className={css.countdownUnit}>
        <h2>{hours}</h2>
        <p>Hours</p>
      </div>
      <div className={css.countdownUnit}>
        <h2>{minutes}</h2>
        <p>Minutes</p>
      </div>
    </div>
  </div>
)

DoubleCreditCountdownPresentation.propTypes = proptypes

export { DoubleCreditCountdownPresentation }