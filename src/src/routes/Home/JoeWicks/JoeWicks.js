import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { joeWicks } from 'config/home'
import css from './JoeWicks.css'

export const JoeWicks = ({ isCarouselShiftEnabled }) => (
  <div
    className={classNames(css.backgroundContainer, {
      [css.carouselShiftExperiment]: isCarouselShiftEnabled,
    })}
  >
    <div className={css.container}>
      <div role="img" aria-label="joe wicks" className={css.joeWicksImage} />
      <div className={css.textContainer}>
        <p className={classNames(css.quote, { [css.redesignColor]: isCarouselShiftEnabled })}>
          {joeWicks}
        </p>
        <span
          className={classNames(css.joeWicksSign, { [css.redesignSign]: isCarouselShiftEnabled })}
        >
          Joe Wicks
        </span>
        <span
          className={classNames(css.bodyCoach, { [css.redesignCoach]: isCarouselShiftEnabled })}
        >
          {' '}
          | The Body Coach
        </span>
      </div>
    </div>
  </div>
)

JoeWicks.propTypes = {
  isCarouselShiftEnabled: PropTypes.bool,
}

JoeWicks.defaultProps = {
  isCarouselShiftEnabled: false,
}
