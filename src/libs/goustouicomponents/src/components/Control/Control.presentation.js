import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
}

const defaultProps = {
  children: null,
}

const ControlPresentation = ({ children, className }) => (
  <span className={className}>
    {children}
  </span>
)

ControlPresentation.defaultProps = defaultProps
ControlPresentation.propTypes = propTypes

export { ControlPresentation }
