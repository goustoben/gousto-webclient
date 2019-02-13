import React from 'react'
import PropTypes from 'prop-types'

import { getEllipse } from './ellipse'
import css from './Spotlight.css'

const RADIUS = 100
const accuracy = 0.3

const getDocumentHeight = () => {
  const { body, documentElement } = document

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight,
  )
}

const Spotlight = ({ x, y, onClick }) => {
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
        height: getDocumentHeight(),
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
      onClick={onClick}
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
  onClick: PropTypes.func,
}

export {
  Spotlight,
}
