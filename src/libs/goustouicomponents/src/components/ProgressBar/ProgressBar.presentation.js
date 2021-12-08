import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import css from './ProgressBar.module.css'

const propTypes = {
  a11yDescription: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  themeClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const ProgressBarPresentation = ({ a11yDescription, percentage, themeClasses }) => {
  const CSSThemeClasses = themeClasses.map((color) => css[color])
  const classes = classnames(css.progressBar, CSSThemeClasses)

  return (
    <div
      className={css.container}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext={a11yDescription}
    >
      <div className={classes} style={{ width: `${percentage}%` }} />
    </div>
  )
}

ProgressBarPresentation.propTypes = propTypes

export {
  ProgressBarPresentation,
}
