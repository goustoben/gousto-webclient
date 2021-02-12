import React from 'react'
import config from 'config/home'
import css from './JoeWicks.css'

const JoeWicks = () => (
  <div className={css.backgroundContainer}>
    <div className={css.container}>
      <div className={css.joeWicksImage} />
      <div className={css.textContainer}>
        <p className={css.quote}>{config.joeWicks}</p>
        <span className={css.joeWicksSign}>Joe Wicks</span>
        <span className={css.bodyCoach}> | The Body Coach</span>
      </div>
    </div>
  </div>
)

export { JoeWicks }
