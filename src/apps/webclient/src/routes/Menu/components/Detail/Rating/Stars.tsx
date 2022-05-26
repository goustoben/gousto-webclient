import React from 'react'

import css from './Rating.css'

type StarsProps = {
  average: number
}

export const Stars = ({ average = 0 }: StarsProps) => {
  const stars = []
  const avgRounded = Math.round(average)
  const avgFloored = Math.floor(average)

  let i: number

  for (i = 0; i < avgFloored; i++) {
    stars.push(<span className={css.starFull} key={i + 1} />)
  }
  if (avgRounded > avgFloored) {
    stars.push(<span className={css.starHalf} key={avgRounded} />)
    i += 1
  }
  for (i; i < 5; i++) {
    stars.push(<span className={css.starEmpty} key={i + 1} />)
  }

  return <span className={css.starColor}>{stars}</span>
}
