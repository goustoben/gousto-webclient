import React from 'react'
import PropTypes from 'prop-types'
import { onEnter } from 'utils/accessibility'
import { getDocumentHeight, getEllipse } from './helpers'
import css from './Spotlight.css'

const RADIUS = 100
const accuracy = 0.3

const Spotlight = ({ x, y, onClick }) => {
  const steps = getEllipse({
    originX: x,
    originY: y,
    radius: RADIUS,
    accuracy,
  })

  return (
    <div
      role="button"
      tabIndex={0}
      data-testing="spotlight-overlay"
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
        '-webkit-clip-path': `polygon(
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
      onKeyDown={onEnter(onClick)}
    />
  )
}

Spotlight.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  onClick: PropTypes.func,
}

Spotlight.defaultProps = {
  x: 0,
  y: 0,
  onClick: null,
}

export { Spotlight, RADIUS, accuracy }
