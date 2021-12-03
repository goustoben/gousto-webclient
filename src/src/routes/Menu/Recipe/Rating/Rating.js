import PropTypes from 'prop-types'
import React from 'react'
import css from './Rating.module.css'

class RecipeRating extends React.Component {
  showStar(avg) {
    let i
    const stars = []
    const avgRounded = Math.round(avg)
    const avgFloored = Math.floor(avg)
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

    return stars
  }

  render() {
    const { count, average, view } = this.props

    if (!count) {
      return null
    }

    return (
      <span className={css.ratingContainer}>
        <span className={css.starColor}>
          {this.showStar(average)}
        </span>
        {view !== 'simple' && (
          <span className={css.description}>
            {' '}
            {count}
            {' '}
            reviews
          </span>
        )}
      </span>
    )
  }
}

RecipeRating.propTypes = {
  count: PropTypes.number,
  average: PropTypes.number,
  view: PropTypes.string,
}

RecipeRating.defaultProps = {
  count: 0,
  average: 0,
  view: null,
}

export { RecipeRating }
