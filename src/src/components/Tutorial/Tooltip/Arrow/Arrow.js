import React from 'react'
import PropTypes from 'prop-types'

import css from './Arrow.css'

const getArrowClasses = (position) => {
  const [ positionY, positionX ] = position.split('-')

  return `${css.arrow} ${css[`arrow--${positionY}`]} ${(positionX) ? css[`arrow--${positionX}`] : ''}`
}

const Arrow = ({ positionY, position }) => (
  (position.includes(positionY)) ? (
    <span className={getArrowClasses(position)}>
      {(position.includes('top')) ? '▲' : '▼'}
    </span>
  ) : null
)

Arrow.defaultProps = {
  positionY: 'top',
  position: 'top',
}

Arrow.propTypes = {
  positionY: PropTypes.string,
  position: PropTypes.string,
}

export {
  Arrow,
  getArrowClasses,
}
