import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './Rating.module.css'

const checkPositiveNumbers = (value) => {
  if (value < 0) {
    return 0
  }

  return value
}

const createStarClassnames = (average) => {
  const MAX_NUMBER_OF_STARS = 5
  const roundedAverage = Math.round(average)
  const stars = Array(MAX_NUMBER_OF_STARS).fill('starEmpty')

  if (average <= 0) {
    return stars
  }

  if (average >= MAX_NUMBER_OF_STARS) {
    return stars.fill('starFull')
  }

  return stars.map((star, index) => {
    const starValue = index + 1

    if (starValue <= average) {
      stars[index] = 'starFull'

      return stars[index]
    }

    if (starValue === roundedAverage) {
      stars[index] = 'starHalf'

      return stars[index]
    }

    return stars[index]
  })
}

const Rating = ({ amountOfReviews, average, size }) => {
  const stars = createStarClassnames(average)
  const reviews = checkPositiveNumbers(amountOfReviews)

  return (
    <div className={css.ratingContainer}>
      <span className={classNames(css.starsContainer, css[`starsContainer${size}`])}>
        {stars.map((star, i) => (
          <span key={`${star + i}`} className={css[star]} />
        ))}
      </span>
      <span className={classNames(css.reviews, css[`reviews${size}`])}>
        {reviews}
        {' '}
        reviews
      </span>
    </div>
  )
}

Rating.propTypes = {
  amountOfReviews: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['Medium', 'Large']).isRequired,
}

export {
  Rating,
}
