import React from 'react'
import PropTypes from 'prop-types'

import css from './Spinner.module.css'

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

const SpinnerPresentation = ({ children }) => (
  <div className={css.fadingCircle}>
    {children}
  </div>
)

SpinnerPresentation.propTypes = propTypes

export {
  SpinnerPresentation,
}
