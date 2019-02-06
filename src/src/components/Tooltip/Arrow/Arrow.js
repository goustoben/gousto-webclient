import React from 'react'
import PropTypes from 'prop-types'

import css from './Arrow.css'

const arrowClasses = (position) => {
  const [ positionY, positionX ] = position.split('-')

  return `${css.arrow} ${css[`arrow--${positionY}`]} ${(positionX) ? css[`arrow--${positionX}`] : ''}`
}

const Arrow = ({ positionY, position }) => (
  (position.includes(positionY)) ? (
    <div className={arrowClasses(position)} />
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
}
