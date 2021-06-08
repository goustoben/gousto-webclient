import React from 'react'
import { joeWicks } from 'config/home'
import css from './JoeWicks.css'

const JoeWicks = () => (
  <div className={css.backgroundContainer}>
    <div className={css.container}>
      <div role="img" aria-label="joe wicks" className={css.joeWicksImage} />
      <div className={css.textContainer}>
        <p className={css.quote}>{joeWicks}</p>
        <span className={css.joeWicksSign}>Joe Wicks</span>
        <span className={css.bodyCoach}> | The Body Coach</span>
      </div>
    </div>
  </div>
)

export { JoeWicks }
