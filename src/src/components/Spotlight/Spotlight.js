import React from 'react'
import PropTypes from 'prop-types'

import { getEllipse } from './ellipse'
import css from './Spotlight.css'

const RADIUS = 100
const accuracy = 0.3

const Spotlight = ({ x, y }) => {
  const steps = getEllipse({
    originX: x,
    originY: y,
    radius: RADIUS,
    accuracy,
  })

  return (
    <div
      className={css.spotlight}
      style={{
        clipPath: `polygon(
          0% 0%,
          100% 0%,
          100% ${y}px,
          ${steps}
          100% ${y}px,
          100% 100%,
          0% 100%
        )`,
      }}
    >
    </div>
  )
}

Spotlight.defaultProps = {
  x: 0,
  y: 0,
}

Spotlight.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
}

export {
  Spotlight,
}
