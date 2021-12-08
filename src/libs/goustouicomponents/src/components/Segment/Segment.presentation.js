import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  accessibility: PropTypes.shape().isRequired,
  'data-testing': PropTypes.string,
}

const defaultProps = {
  'data-testing': null,
}

const SegmentPresentation = ({
  children, onClick, onKeyUp, onMouseEnter, onMouseLeave, className, 'data-testing': dataTesting, accessibility,
}) => (
  <div
    onClick={onClick()}
    onKeyUp={onKeyUp()}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    role="button"
    tabIndex={0}
    className={className}
    data-testing={dataTesting}
    {...accessibility} // eslint-disable-line react/jsx-props-no-spreading
  >
    {children}
  </div>
)

SegmentPresentation.propTypes = propTypes
SegmentPresentation.defaultProps = defaultProps

export { SegmentPresentation }
