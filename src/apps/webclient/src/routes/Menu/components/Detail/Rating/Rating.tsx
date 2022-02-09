import React from 'react'
import { DetailViewType } from '../types'
import { Stars } from './Stars'
import css from './Rating.css'

type RecipeRatingProps = {
  count: number
  average: number
  view: DetailViewType | null
}

export const RecipeRating = ({ count = 0, average = 0, view = null }: RecipeRatingProps) => {
  if (!count) {
    return null
  }

  return (
    <span className={css.ratingContainer}>
      <Stars average={average} />
      {view !== 'simple' && <span className={css.description}> {count} reviews</span>}
    </span>
  )
}
