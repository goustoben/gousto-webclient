import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBarPresentation } from './ProgressBar.presentation'

const PROGRESS_BAR_THEME = {
  'transition-1': [75, 100],
}

const defaultProps = {
  a11yDescription: 'Progress bar',
  theme: 'solid',
}

const propTypes = {
  a11yDescription: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  theme: PropTypes.oneOf([
    defaultProps.theme,
    ...Object.keys(PROGRESS_BAR_THEME),
  ]),
}

const sanitisePercentage = (percentage) => {
  if (percentage < 0) {
    return 0
  } else if (percentage > 100) {
    return 100
  }

  return percentage
}

const setThemeClasses = (theme, percentage) => {
  const classes = [theme]

  if (PROGRESS_BAR_THEME[theme]) {
    PROGRESS_BAR_THEME[theme].forEach((stop, index) => {
      if (stop <= percentage) {
        classes.push(`${theme}-stop-${index}`)
      }
    })
  }

  return classes
}

const ProgressBar = ({ a11yDescription, percentage, theme }) => (
  <ProgressBarPresentation
    a11yDescription={a11yDescription}
    percentage={sanitisePercentage(percentage)}
    themeClasses={setThemeClasses(theme, percentage)}
  />
)

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export {
  PROGRESS_BAR_THEME,
  ProgressBar,
}
