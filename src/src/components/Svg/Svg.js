import PropTypes from 'prop-types'
import React from 'react'
import css from './Svg.css'

const Svg = ({ fileName, className }) => {
  const svgUrl = require(`media/svgs/${fileName}.svg`) // eslint-disable-line global-require

  return (
    <div className={`${css.svg} ${fileName} ${className}`} style={{ backgroundImage: `url(${svgUrl})` }} />
  )
}

Svg.propTypes = {
  fileName: PropTypes.string,
  className: PropTypes.string,
}

Svg.defaultProps = {
  fileName: '',
  className: '',
}
export default Svg
