import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatSeconds } from '../checkoutUrgencyUtils'
import css from './Clock.module.css'

export const Clock = ({ seconds, total, isCritical }) => {
  const svgViewBox = 128
  const center = svgViewBox / 2
  const strokeWidth = 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const highlightedPart = Math.min((1 - seconds / total) * circumference, circumference)

  return (
    <div className={css.clock}>
      <svg viewBox={`0 0 ${svgViewBox} ${svgViewBox}`} className={css.clockSvg} fill="none">
        <circle cx={center} cy={center} r={radius} stroke="#AEB7C0" strokeWidth={1} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${highlightedPart}, ${circumference}`}
          className={classNames(css.highlight, { [css.highlightIsCritical]: isCritical })}
        />
      </svg>
      <div className={classNames(css.text, { [css.textIsCritical]: isCritical })}>
        {formatSeconds(seconds)}
      </div>
    </div>
  )
}

Clock.propTypes = {
  seconds: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isCritical: PropTypes.bool.isRequired,
}
