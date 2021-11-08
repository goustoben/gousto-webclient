import PropTypes from 'prop-types'
import React from 'react'
import css from './Svg.css'

export const Svg = ({ fileName, className, label, hidden }) => {
  const svgUrl = require(`media/svgs/${fileName}.svg`) // eslint-disable-line global-require

  return (
    <div
      role="img"
      aria-label={label}
      className={`${css.svg} ${fileName} ${className}`}
      style={{ backgroundImage: `url(${svgUrl})` }}
      aria-hidden={hidden}
    />
  )
}

Svg.propTypes = {
  hidden: PropTypes.bool,
  fileName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
}

Svg.defaultProps = {
  hidden: false,
  fileName: '',
  className: '',
  label: ''
}
