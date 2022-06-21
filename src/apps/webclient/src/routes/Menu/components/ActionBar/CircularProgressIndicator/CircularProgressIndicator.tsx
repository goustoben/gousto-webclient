import React from 'react'

import classNames from 'classnames'

import css from './CircularProgressIndicator.module.css'

type Props = {
  maxRecipesNumAchieved: boolean
  recipeCount: number
  maxRecipesNum: number
}

export const CircularProgressIndicator = ({
  maxRecipesNumAchieved,
  recipeCount,
  maxRecipesNum,
}: Props) => {
  const svgViewBox = 32
  const center = svgViewBox / 2
  const strokeWidth = 2
  const radius = svgViewBox / 2 - 1
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((recipeCount * circumference) / maxRecipesNum, circumference)

  return (
    <div className={css.circularProgressIndicator}>
      <svg className={css.svg} viewBox={`0 0 ${svgViewBox} ${svgViewBox}`}>
        <circle className={css.backingCircle} cx={center} cy={center} r={radius} />
        <circle
          className={classNames(css.arc, {
            [css.arcGreen]: recipeCount > 1,
          })}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${percentage}, ${circumference}`}
          strokeWidth={strokeWidth}
        />
      </svg>
      <span>{recipeCount}</span>
      <span
        className={classNames(css.slash, {
          [css.checkoutSlash]: maxRecipesNumAchieved,
        })}
      >
        /
      </span>
      <span>{maxRecipesNum}</span>
    </div>
  )
}
