import React from 'react'
import { useRecipeCookingTime } from 'routes/Menu/context/recipeContext'
import css from './CookingTimeIcon.css'
import { getPercentageFromCookingTime } from './getPercentageFromCookingTime'

const CookingTimeIcon = () => {
  const cookingTime = useRecipeCookingTime()

  if (!cookingTime) {
    return null
  }

  const percentage = getPercentageFromCookingTime(cookingTime)

  return (
    <div className={css.cookingTimeIcon}>
      <svg viewBox="0 0 36 36" className={css.circularChart}>
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

      <div className={css.time}>{cookingTime}</div>
    </div>
  )
}

CookingTimeIcon.propTypes = {}

CookingTimeIcon.defaultProps = {}

export { CookingTimeIcon }
