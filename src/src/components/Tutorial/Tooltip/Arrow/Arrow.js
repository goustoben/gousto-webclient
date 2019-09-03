import React from 'react'
import PropTypes from 'prop-types'

import css from './Arrow.css'

const getArrowClasses = (position) => {
  const [positionY, positionX] = position.split('-')

  return `${css.arrow} ${css[`arrow--${positionY}`]} ${(positionX) ? css[`arrow--${positionX}`] : ''}`
}

const Arrow = ({ positionY, position, style }) => (
  (position.includes(positionY)) ? (
    <span className={getArrowClasses(position)} style={style}>
      {(position.includes('top')) ? '▲' : '▼'}
    </span>
  ) : null
)

Arrow.defaultProps = {
  positionY: 'top',
  position: 'top',
  style: {}
}

Arrow.propTypes = {
  positionY: PropTypes.string,
  position: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]))
}

export {
  Arrow,
  getArrowClasses,
}
