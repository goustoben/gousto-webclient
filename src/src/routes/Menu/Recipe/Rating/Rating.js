import PropTypes from 'prop-types'
import React from 'react'
import { InfoBadgeContainer, infoBadgeSlugs } from '../InfoBadge'
import css from './Rating.css'

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
    const { count, average, view, isNew, isChefPrepared } = this.props
    if (count > 0) {
      return (
        <span className={css.ratingContainer}>
          {isChefPrepared ? <InfoBadgeContainer slug={infoBadgeSlugs.OVEN_READY} /> : null}
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

    return (
      <span>
        {isChefPrepared ? <InfoBadgeContainer slug={infoBadgeSlugs.OVEN_READY} /> : null}
        {isNew ? <InfoBadgeContainer slug={infoBadgeSlugs.NEW_RECIPE} /> : null}
      </span>
    )
  }
}

RecipeRating.propTypes = {
  count: PropTypes.number,
  average: PropTypes.number,
  view: PropTypes.string,
  isNew: PropTypes.bool.isRequired,
  isChefPrepared: PropTypes.bool
}

RecipeRating.defaultProps = {
  count: 0,
  average: 0,
  view: null,
  isChefPrepared: false
}

export { RecipeRating }
