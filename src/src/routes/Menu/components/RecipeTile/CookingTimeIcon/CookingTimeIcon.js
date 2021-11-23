import React from 'react'
import PropTypes from 'prop-types'
import css from './CookingTimeIcon.css'
import { getPercentageFromCookingTime } from './utils/getPercentageFromCookingTime'

const CookingTimeIcon = ({ cookingTime }) => {
  if (!cookingTime) {
    return null
  }

  const percentage = getPercentageFromCookingTime(cookingTime)

  return (
    <div>
      {/* <svg viewBox="0 0 36 36" className={css.circularChart}>
        <path
          className={css.circularChartCircleBg}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={css.circularChartCircle}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <div className={css.time}>{cookingTime}</div> */}
    </div>
  )
}

CookingTimeIcon.propTypes = {
  cookingTime: PropTypes.number.isRequired,
}

CookingTimeIcon.defaultProps = {
}

export { CookingTimeIcon }
