import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

const CloseIconPresentation = ({ className, onClick }) => (
  <button
    aria-label="Close"
    className={className}
    onClick={onClick}
    type="button"
  />
)

CloseIconPresentation.propTypes = propTypes

export {
  CloseIconPresentation,
}
