import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
// eslint-disable-next-line import/no-unresolved
import css from 'styles/vendor/font-awesome-module.css'

export const Icon = ({ name, fixedWidth, size, style, className }) => (
  <span
    className={classNames(css['fa-basic-class'], css[name], {
      [css['fa-fw']]: fixedWidth,
      [className]: className,
    })}
    style={{ fontSize: size || 'inherit', ...style }}
  />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  fixedWidth: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
}

Icon.defaultProps = {
  className: null,
  fixedWidth: false,
  size: null,
  style: {},
}
