import React from 'react'
import PropTypes from 'prop-types'
import css from './TimeIndicator.module.css'

const TimeIndicator = ({ time }) => {
  const svgViewBox = 32
  const center = svgViewBox / 2
  const strokeWidth = 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((time * circumference) / 60, circumference)
  const textY = center + 5

  return (
    <div className={css.timeIcon}>
      <svg viewBox={`0 0 ${svgViewBox} ${svgViewBox}`} className={css.circularChart}>
        <circle
          className={css.circularChartCircleBg}
          cx={center}
          cy={center}
          r={radius}
        />
        <circle
          className={css.circularChartCircle}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${percentage}, ${circumference}`}
        />
        <text
          x={center}
          y={textY}
          className={css.time}
          dominantBaseline="auto"
          textAnchor="middle"
        >
          {time}
        </text>
      </svg>
    </div>
  )
}

TimeIndicator.propTypes = {
  time: PropTypes.number.isRequired,
}

export {
  TimeIndicator,
}
