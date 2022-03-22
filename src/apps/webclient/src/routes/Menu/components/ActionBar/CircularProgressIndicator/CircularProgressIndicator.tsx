import React from 'react'
import classNames from 'classnames'
import css from './CircularProgressIndicator.module.css'

type Props = {
  canCheckout: boolean
  numRecipes: number
  maxRecipes: number
}

export const CircularProgressIndicator = ({ canCheckout, numRecipes, maxRecipes }: Props) => {
  const svgViewBox = 32
  const center = svgViewBox / 2
  const strokeWidth = 2
  const radius = svgViewBox / 2 - 1
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((numRecipes * circumference) / maxRecipes, circumference)

  return (
    <div className={css.circularProgressIndicator}>
      <svg className={css.svg} viewBox={`0 0 ${svgViewBox} ${svgViewBox}`}>
        <circle className={css.backingCircle} cx={center} cy={center} r={radius} />
        <circle
          className={classNames(css.arc, {
            [css.arcCanCheckout]: canCheckout,
          })}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${percentage}, ${circumference}`}
          strokeWidth={strokeWidth}
        />
      </svg>
      <span>{numRecipes}</span>
      <span className={css.slash}>/</span>
      <span>{maxRecipes}</span>
    </div>
  )
}
