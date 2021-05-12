import PropTypes from 'prop-types'
import React from 'react'
import css from './Svg.css'

const Svg = ({ fileName, className, label }) => {
  const svgUrl = require(`media/svgs/${fileName}.svg`) // eslint-disable-line global-require

  return (
    <div
      role="img"
      aria-label={label}
      className={`${css.svg} ${fileName} ${className}`}
      style={{ backgroundImage: `url(${svgUrl})` }}
    />
  )
}

Svg.propTypes = {
  fileName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
}

Svg.defaultProps = {
  fileName: '',
  className: '',
  label: ''
}
export default Svg
