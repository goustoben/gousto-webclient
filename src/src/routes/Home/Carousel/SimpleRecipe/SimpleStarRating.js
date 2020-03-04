import PropTypes from 'prop-types'
import React from 'react'
import css from './SimpleStarRating.css'

const showStar = (avg) => {
  let i
  const stars = []
  const averageRounded = Math.round(avg)
  const averageFloored = Math.floor(avg)
  for (i = 0; i < averageFloored; i++) {
    stars.push(<span className={css.starFull} key={i + 1} />)
  }
  if (averageRounded > averageFloored) {
    stars.push(<span className={css.starHalf} key={averageRounded} />)
    i += 1
  }
  for (i; i < 5; i++) {
    stars.push(<span className={css.starEmpty} key={i + 1} />)
  }

  return stars
}

const SimpleStarRating = ({count, average}) => {
  if (count > 0) {
    return (
      <span className={css.ratingContainer}>
        <span className={css.starColor}>
          {showStar(average)}
        </span>
      </span>
    )
  }

  return null
}

SimpleStarRating.propTypes = {
  count: PropTypes.number,
  average: PropTypes.number,
}

SimpleStarRating.defaultProps = {
  count: 0,
  average: 0,
}

export { SimpleStarRating }
