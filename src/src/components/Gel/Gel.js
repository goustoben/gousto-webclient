import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './Gel.css'

const Gel = ({ className, size, children, color }) => (
  <div className={classnames(css[size], css[color], className)}>
    <div className={css.gelContent}>{children}</div>
  </div>
)

Gel.propTypes = {
  color: PropTypes.oneOf(['white', 'bronze', 'red', 'blue', 'black', 'gold']),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
}

Gel.defaultProps = {
  size: 'medium',
  color: 'white',
  className: null,
  children: null,
}

export default Gel
